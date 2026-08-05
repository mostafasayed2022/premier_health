const fs = require("fs");
const path = require("path");

const MESSAGES_DIR = path.join(process.cwd(), "src", "messages");
const LOCALES = ["ar", "en", "fr", "de", "es", "it", "tr"];

const WHY_CHOOSE_US_DATA = {
  excellence: "Delivering the highest standards of medical and aesthetic care through world-class expertise and advanced protocols.",
  integrity: "Maintaining complete transparency, ethics and clinical honesty in every step of care.",
  patientCentered: "Prioritizing your comfort, wellness goals and privacy above everything else.",
  compassion: "Providing compassionate care built on empathy, respect and personal attention.",
  innovation: "Utilizing cutting-edge technologies and advanced therapies for exceptional results."
};

LOCALES.forEach((locale) => {
  const targetDir = path.join(MESSAGES_DIR, locale);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const file = path.join(targetDir, "WhyChooseUs.json");
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(WHY_CHOOSE_US_DATA, null, 2) + "\n", "utf-8");
    console.log(`Created WhyChooseUs.json for ${locale}`);
  }
});
