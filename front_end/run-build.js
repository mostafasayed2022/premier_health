const { execSync } = require('child_process');
const fs = require('fs');

try {
  execSync('npm run build', { encoding: 'utf-8', stdio: 'pipe' });
  fs.writeFileSync('build-output.txt', 'Build successful');
} catch (error) {
  fs.writeFileSync('build-output.txt', error.stdout + '\n' + error.stderr);
}
