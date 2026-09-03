const https = require('https');

function testEndpoint(name, path, headers) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.premierhealthclinics.com',
      port: 443,
      path: path,
      method: 'GET',
      headers: headers
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log(`[${name}] ${path} -> Status: ${res.statusCode}`);
        if (res.statusCode >= 400) {
          console.log(`[${name}] Response preview: ${data.substring(0, 300)}`);
        }
        resolve({ name, status: res.statusCode });
      });
    });

    req.on('error', (e) => {
      console.log(`[${name}] Error: ${e.message}`);
      resolve({ name, error: e.message });
    });

    req.end();
  });
}

async function run() {
  console.log('Testing api.premierhealthclinics.com ...');
  await testEndpoint('1. Departments (clean)', '/api/wizard/departments/', { 'Accept': 'application/json' });
  await testEndpoint('2. Departments (Accept-Language: ar)', '/api/wizard/departments/', { 'Accept': 'application/json', 'Accept-Language': 'ar' });
  await testEndpoint('3. Departments (dummy Bearer)', '/api/wizard/departments/', { 'Accept': 'application/json', 'Authorization': 'Bearer invalid_token' });
  
  await testEndpoint('4. Doctors (clean)', '/api/wizard/doctors/', { 'Accept': 'application/json' });
  await testEndpoint('5. Doctors (Accept-Language: ar)', '/api/wizard/doctors/', { 'Accept': 'application/json', 'Accept-Language': 'ar' });
  await testEndpoint('6. Doctors (dummy Bearer)', '/api/wizard/doctors/', { 'Accept': 'application/json', 'Authorization': 'Bearer invalid_token' });

  await testEndpoint('7. Branches (clean)', '/api/wizard/branches/', { 'Accept': 'application/json' });
  await testEndpoint('8. Branches (Accept-Language: ar)', '/api/wizard/branches/', { 'Accept': 'application/json', 'Accept-Language': 'ar' });

  await testEndpoint('9. Services (clean)', '/api/wizard/services/', { 'Accept': 'application/json' });
  await testEndpoint('10. Services (Accept-Language: ar)', '/api/wizard/services/', { 'Accept': 'application/json', 'Accept-Language': 'ar' });
}

run();

