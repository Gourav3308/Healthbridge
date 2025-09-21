#!/bin/bash

# Healthbridge Deployment Script
echo "🚀 Starting Healthbridge Deployment..."

# Build backend
echo "📦 Building Backend..."
cd backend
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed!"
    exit 1
fi
cd ..

# Build frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi
cd ..

echo "✅ Build completed successfully!"
echo "📤 Ready for deployment to Railway/Render"
