const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== STARTUP DEBUG SCRIPT ===');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');
console.log('PORT:', process.env.PORT || '4200');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'angular.json',
  'server.js',
  'src/main.ts',
  'src/index.html'
];

console.log('\n=== CHECKING REQUIRED FILES ===');
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  console.log(`${file}: ${exists ? 'EXISTS' : 'MISSING'}`);
  if (exists && file === 'package.json') {
    try {
      const packageJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`  - Scripts:`, Object.keys(packageJson.scripts || {}));
    } catch (e) {
      console.log(`  - Error reading package.json:`, e.message);
    }
  }
});

// Check dist directory
console.log('\n=== CHECKING DIST DIRECTORY ===');
const distPath = path.join(__dirname, 'dist');
const healthbridgeDistPath = path.join(distPath, 'healthbridge-frontend');
const indexPath = path.join(healthbridgeDistPath, 'index.html');

console.log('Dist directory exists:', fs.existsSync(distPath));
console.log('Healthbridge dist directory exists:', fs.existsSync(healthbridgeDistPath));
console.log('Index.html exists:', fs.existsSync(indexPath));

if (fs.existsSync(distPath)) {
  console.log('Dist contents:', fs.readdirSync(distPath));
}

if (fs.existsSync(healthbridgeDistPath)) {
  console.log('Healthbridge dist contents:', fs.readdirSync(healthbridgeDistPath));
}

// Try to start the server
console.log('\n=== STARTING SERVER ===');
try {
  require('./server.js');
} catch (error) {
  console.error('Error starting server:', error);
  process.exit(1);
}
