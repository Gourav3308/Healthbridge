const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d', // Cache static assets for 1 day
  etag: false
}));

// Handle SPA routing - serve index.html for all routes that don't match static files
app.get('*', (req, res) => {
  // Check if the request is for a static file
  if (req.path.includes('.')) {
    return res.status(404).send('File not found');
  }
  
  // For all other routes, serve the Angular app
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`HealthBridge Frontend Server running on port ${port}`);
  console.log(`Serving SPA with fallback routing`);
});
