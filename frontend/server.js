const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

console.log('=== SERVER STARTING ===');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV || 'development');

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist', 'healthbridge-frontend');
console.log('Dist path:', distPath);
console.log('Dist directory exists:', fs.existsSync(distPath));

if (fs.existsSync(distPath)) {
  console.log('Dist directory contents:', fs.readdirSync(distPath));
} else {
  console.log('Dist directory does not exist!');
}

// Serve static files from the dist directory
app.use(express.static(distPath, {
  maxAge: '1d', // Cache static assets for 1 day
  etag: false
}));

// Handle SPA routing - serve index.html for all routes that don't match static files
app.get('*', (req, res) => {
  console.log('=== SERVER REQUEST RECEIVED ===');
  console.log('Requested path:', req.path);
  console.log('Requested URL:', req.url);
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  
  // Check if the request is for a static file
  if (req.path.includes('.') && !req.path.startsWith('/auth/') && !req.path.startsWith('/patient/') && !req.path.startsWith('/doctor/') && !req.path.startsWith('/admin/') && !req.path.startsWith('/info/')) {
    console.log('Static file request, returning 404');
    return res.status(404).send('File not found');
  }
  
  // For all other routes, serve the Angular app
  console.log('Serving Angular app for path:', req.path);
  const indexPath = path.join(__dirname, 'dist', 'healthbridge-frontend', 'index.html');
  console.log('Index file path:', indexPath);
  console.log('Index file exists:', fs.existsSync(indexPath));
  
  if (!fs.existsSync(indexPath)) {
    console.error('Index.html not found at:', indexPath);
    console.log('Serving fallback page instead');
    const fallbackPath = path.join(__dirname, 'fallback.html');
    if (fs.existsSync(fallbackPath)) {
      return res.sendFile(fallbackPath);
    } else {
      return res.status(500).json({
        error: 'Application not built properly',
        message: 'index.html not found in dist directory',
        path: indexPath,
        distContents: fs.existsSync(distPath) ? fs.readdirSync(distPath) : 'dist directory does not exist'
      });
    }
  }
  
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      console.error('Error details:', err.message);
      res.status(500).json({
        error: 'Error loading application',
        message: err.message,
        path: indexPath
      });
    } else {
      console.log('Successfully served index.html for path:', req.path);
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  console.log('Health check accessed');
  res.json({ 
    status: 'OK',
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    distExists: fs.existsSync(distPath)
  });
});

// Add a test route to verify server is working
app.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ 
    message: 'Server is working!', 
    timestamp: new Date().toISOString(),
    path: req.path,
    url: req.url,
    distExists: fs.existsSync(distPath)
  });
});

// Add a test HTML page
app.get('/test.html', (req, res) => {
  console.log('Test HTML page accessed');
  const testHtmlPath = path.join(__dirname, 'test.html');
  console.log('Test HTML path:', testHtmlPath);
  console.log('Test HTML exists:', fs.existsSync(testHtmlPath));
  
  if (fs.existsSync(testHtmlPath)) {
    res.sendFile(testHtmlPath);
  } else {
    res.status(404).send('Test HTML file not found');
  }
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`HealthBridge Frontend Server running on port ${port}`);
  console.log(`Serving SPA with fallback routing`);
  console.log(`Test route available at: http://localhost:${port}/test`);
});
