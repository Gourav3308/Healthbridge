@echo off
echo 🚀 Starting Healthbridge Deployment...

echo 📦 Building Backend...
cd backend
call mvn clean package -DskipTests
if %errorlevel% neq 0 (
    echo ❌ Backend build failed!
    exit /b 1
)
cd ..

echo 📦 Building Frontend...
cd frontend
call npm install
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    exit /b 1
)
cd ..

echo ✅ Build completed successfully!
echo 📤 Ready for deployment to Railway/Render
pause
