const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist', 'healthbridge-frontend'), {
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
  
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      console.error('Error details:', err.message);
      res.status(500).send('Error loading application');
    } else {
      console.log('Successfully served index.html for path:', req.path);
    }
  });
});

// Add a test route to verify server is working
app.get('/test', (req, res) => {
  console.log('Test route accessed');
  res.json({ 
    message: 'Server is working!', 
    timestamp: new Date().toISOString(),
    path: req.path,
    url: req.url
  });
});

// Add a test HTML page
app.get('/test.html', (req, res) => {
  console.log('Test HTML page accessed');
  res.sendFile(path.join(__dirname, 'test.html'));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`HealthBridge Frontend Server running on port ${port}`);
  console.log(`Serving SPA with fallback routing`);
  console.log(`Test route available at: http://localhost:${port}/test`);
});
