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
  console.log('Requested path:', req.path);
  
  // Check if the request is for a static file
  if (req.path.includes('.') && !req.path.startsWith('/auth/') && !req.path.startsWith('/patient/') && !req.path.startsWith('/doctor/') && !req.path.startsWith('/admin/') && !req.path.startsWith('/info/')) {
    console.log('Static file request, returning 404');
    return res.status(404).send('File not found');
  }
  
  // For all other routes, serve the Angular app
  console.log('Serving Angular app for path:', req.path);
  res.sendFile(path.join(__dirname, 'dist', 'healthbridge-frontend', 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error loading application');
    }
  });
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`HealthBridge Frontend Server running on port ${port}`);
  console.log(`Serving SPA with fallback routing`);
});
