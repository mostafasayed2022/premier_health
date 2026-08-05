const fs = require('fs');
const path = require('path');

// Helper to flatten nested JSON object
function flattenObject(obj, prefix = '') {
  let results = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(results, flattenObject(obj[key], fullKey));
      } else {
        results[fullKey] = obj[key];
      }
    }
  }
  return results;
}

// Helper to unflatten flat object back to nested JSON
function unflattenObject(data) {
  let result = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const keys = key.split('.');
      let current = result;
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        if (i === keys.length - 1) {
          current[k] = data[key];
        } else {
          current[k] = current[k] || {};
          current = current[k];
        }
      }
    }
  }
  return result;
}

// Delay helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Translation via Gemini API
async function translateWithGemini(flatObj, sourceLang, targetLang, apiKey) {
  console.log(`Translating ${Object.keys(flatObj).length} keys to [${targetLang}] using Gemini API...`);
  
  // Format target language names for Gemini to get high-quality translation context
  const langNames = {
    en: 'English',
    ar: 'Arabic',
    fr: 'French',
    de: 'German',
    es: 'Spanish',
    it: 'Italian',
    tr: 'Turkish'
  };
  const targetLangName = langNames[targetLang] || targetLang;
  const sourceLangName = langNames[sourceLang] || sourceLang;

  const prompt = `You are an expert translator for "Premier Care", a luxury medical wellness and aesthetics clinic.
Translate the values of the following JSON object from ${sourceLangName} (${sourceLang}) to ${targetLangName} (${targetLang}).

Input JSON:
${JSON.stringify(flatObj, null, 2)}

Strict Rules:
1. Return a JSON object with the exact same keys as the input. Only translate the values.
2. Maintain the luxury, high-end, professional clinical tone.
3. CRITICAL: Preserve all formatting tags like <accent>, </accent>, <br>, \\n, and any HTML or special markup tags exactly as they are. Do not translate or modify these tags.
4. Return ONLY a valid JSON object matching the input structure. Do not include any explanations, markdown code blocks, or preamble.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { 
        responseMimeType: "application/json",
        temperature: 0.1
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const resJson = await response.json();
  const text = resJson.candidates[0].content.parts[0].text.trim();
  
  let cleaned = text;
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(json)?/, '').replace(/```$/, '').trim();
  }
  
  return JSON.parse(cleaned);
}

// Translation via Google Cloud Translation API (using library or fetch)
async function translateWithGoogleCloud(flatObj, sourceLang, targetLang, apiKey) {
  console.log(`Translating ${Object.keys(flatObj).length} keys to [${targetLang}] using Google Cloud Translate...`);
  const keys = Object.keys(flatObj);
  const values = Object.values(flatObj);
  
  // Try using fetch directly (simple API key or bearer token)
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: values,
      target: targetLang,
      source: sourceLang,
      format: 'html' // Use html to keep tags intact
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Cloud API error: ${response.status} - ${errorText}`);
  }

  const resJson = await response.json();
  const translations = resJson.data.translations.map(t => t.translatedText);
  
  const result = {};
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = translations[i];
  }
  return result;
}

// Translation via Official Google Cloud Library (optional, fallback from env credentials)
async function translateWithGoogleLibrary(flatObj, sourceLang, targetLang) {
  console.log(`Translating ${Object.keys(flatObj).length} keys to [${targetLang}] using Google Cloud client library...`);
  const { Translate } = require('@google-cloud/translate').v2;
  const translate = new Translate();
  
  const keys = Object.keys(flatObj);
  const values = Object.values(flatObj);
  
  const [translations] = await translate.translate(values, {
    from: sourceLang,
    to: targetLang,
    format: 'html'
  });
  
  const result = {};
  const translationArray = Array.isArray(translations) ? translations : [translations];
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = translationArray[i];
  }
  return result;
}

// Free Google Translation API fallback (Translates item by item)
async function translateWithFreeFallback(flatObj, sourceLang, targetLang) {
  console.log(`Translating ${Object.keys(flatObj).length} keys to [${targetLang}] using Free Translation Fallback...`);
  const result = {};
  
  for (const [key, value] of Object.entries(flatObj)) {
    if (!value || typeof value !== 'string') {
      result[key] = value;
      continue;
    }
    
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(value)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Free translate API response error: ${response.status}`);
      }
      
      const json = await response.json();
      const translatedText = json[0].map(item => item[0]).join('');
      result[key] = translatedText;
      
      // Wait slightly to prevent rate limits
      await sleep(150);
    } catch (error) {
      console.warn(`Warning: failed to translate key "${key}": ${error.message}`);
      result[key] = value; // Keep original text as fallback
    }
  }
  
  return result;
}

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  let sourceLang = 'ar'; // Default source is Arabic
  let force = false;
  
  args.forEach(arg => {
    if (arg.startsWith('--source=')) {
      sourceLang = arg.split('=')[1];
    }
    if (arg === '--force') {
      force = true;
    }
  });

  const messagesDir = path.join(__dirname, '../src/messages');
  const sourcePath = path.join(messagesDir, `${sourceLang}.json`);
  
  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source language file not found at ${sourcePath}`);
    process.exit(1);
  }

  console.log(`Loading source language: ${sourceLang} (${sourcePath})`);
  const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const flatSource = flattenObject(sourceContent);
  
  // Find all other target files in the messages directory
  const files = fs.readdirSync(messagesDir);
  const targetLangs = files
    .filter(f => f.endsWith('.json') && f !== `${sourceLang}.json`)
    .map(f => f.replace('.json', ''));

  console.log(`Detected target languages: ${targetLangs.join(', ')}`);
  console.log(`Force translate mode: ${force ? 'ON' : 'OFF (Only translating missing keys)'}`);

  // Retrieve API keys
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const googleApiKey = process.env.GOOGLE_TRANSLATE_API_KEY || process.env.GOOGLE_API_KEY;
  const hasGoogleCreds = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  for (const targetLang of targetLangs) {
    const targetPath = path.join(messagesDir, `${targetLang}.json`);
    let targetContent = {};
    if (fs.existsSync(targetPath)) {
      try {
        targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
      } catch (e) {
        console.warn(`Warning: failed to parse ${targetPath}, starting with empty object.`);
      }
    }
    
    const flatTarget = flattenObject(targetContent);
    
    // Identify keys that need translation
    const toTranslate = {};
    for (const [key, value] of Object.entries(flatSource)) {
      if (force || !flatTarget[key] || flatTarget[key] === '') {
        toTranslate[key] = value;
      }
    }
    
    const keysCount = Object.keys(toTranslate).length;
    if (keysCount === 0) {
      console.log(`[${targetLang}] is already up to date. No new keys to translate.`);
      continue;
    }
    
    console.log(`\nTranslating ${keysCount} keys to [${targetLang}]...`);
    let translatedFlat = {};
    
    try {
      if (geminiApiKey) {
        translatedFlat = await translateWithGemini(toTranslate, sourceLang, targetLang, geminiApiKey);
      } else if (googleApiKey) {
        translatedFlat = await translateWithGoogleCloud(toTranslate, sourceLang, targetLang, googleApiKey);
      } else if (hasGoogleCreds) {
        try {
          translatedFlat = await translateWithGoogleLibrary(toTranslate, sourceLang, targetLang);
        } catch (libErr) {
          console.warn(`Official library failed: ${libErr.message}. Falling back to standard requests/apis.`);
          translatedFlat = await translateWithFreeFallback(toTranslate, sourceLang, targetLang);
        }
      } else {
        translatedFlat = await translateWithFreeFallback(toTranslate, sourceLang, targetLang);
      }
      
      // Merge translated values back into target
      const newFlatTarget = { ...flatTarget };
      for (const [key, value] of Object.entries(translatedFlat)) {
        newFlatTarget[key] = value;
      }
      
      // Construct nested JSON object
      const newNestedTarget = unflattenObject(newFlatTarget);
      
      // Save file
      fs.writeFileSync(targetPath, JSON.stringify(newNestedTarget, null, 2) + '\n', 'utf8');
      console.log(`Successfully updated [${targetLang}] message file.`);
      
    } catch (err) {
      console.error(`Error translating to [${targetLang}]:`, err.message);
    }
  }
  
  console.log('\nAll translations complete!');
}

main().catch(console.error);
