const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('=== BUILD TEST SCRIPT ===');
console.log('Current working directory:', process.cwd());
console.log('Node version:', process.version);

// Check if package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
console.log('Package.json exists:', fs.existsSync(packageJsonPath));

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log('Package.json scripts:', packageJson.scripts);
}

// Check if angular.json exists
const angularJsonPath = path.join(__dirname, 'angular.json');
console.log('Angular.json exists:', fs.existsSync(angularJsonPath));

// Check if src directory exists
const srcPath = path.join(__dirname, 'src');
console.log('Src directory exists:', fs.existsSync(srcPath));

if (fs.existsSync(srcPath)) {
  console.log('Src directory contents:', fs.readdirSync(srcPath));
}

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
console.log('Dist directory exists:', fs.existsSync(distPath));

if (fs.existsSync(distPath)) {
  console.log('Dist directory contents:', fs.readdirSync(distPath));
  
  const healthbridgeDistPath = path.join(distPath, 'healthbridge-frontend');
  console.log('Healthbridge dist directory exists:', fs.existsSync(healthbridgeDistPath));
  
  if (fs.existsSync(healthbridgeDistPath)) {
    console.log('Healthbridge dist contents:', fs.readdirSync(healthbridgeDistPath));
  }
}

// Test npm install
console.log('\n=== TESTING NPM INSTALL ===');
exec('npm install', (error, stdout, stderr) => {
  if (error) {
    console.error('NPM install error:', error);
    return;
  }
  console.log('NPM install stdout:', stdout);
  if (stderr) {
    console.log('NPM install stderr:', stderr);
  }
  
  // Test npm run build
  console.log('\n=== TESTING NPM RUN BUILD ===');
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error('NPM build error:', error);
      return;
    }
    console.log('NPM build stdout:', stdout);
    if (stderr) {
      console.log('NPM build stderr:', stderr);
    }
    
    // Check dist directory after build
    console.log('\n=== CHECKING DIST AFTER BUILD ===');
    if (fs.existsSync(distPath)) {
      console.log('Dist directory contents after build:', fs.readdirSync(distPath));
      
      const healthbridgeDistPath = path.join(distPath, 'healthbridge-frontend');
      if (fs.existsSync(healthbridgeDistPath)) {
        console.log('Healthbridge dist contents after build:', fs.readdirSync(healthbridgeDistPath));
        
        const indexPath = path.join(healthbridgeDistPath, 'index.html');
        console.log('Index.html exists after build:', fs.existsSync(indexPath));
      }
    }
  });
});
