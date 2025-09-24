# Environment Variables Setup Guide

## 🏠 **Local Development Setup**

### Step 1: Create `.env` file in `backend/` directory

Create a file named `.env` in your `backend/` folder with the following content:

```env
# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here

# Database Configuration
DB_USERNAME=root
DB_PASSWORD=Sonu@12345

# JWT Secret
JWT_SECRET=healthbridge-secret-key-2023-very-long-secret-key-for-jwt-token-generation

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_ePOPRenR20mzsg
RAZORPAY_SECRET=WLGtxuC251XBSyZiEwyIR3gA

# Mail Configuration
MAIL_USERNAME=healthbridge13012002@gmail.com
MAIL_PASSWORD=bisvrfctijbvfnbu

# Frontend URL (for local development)
FRONTEND_URL=http://localhost:4200

# CORS Origins (for local development)
CORS_ORIGINS=http://localhost:4200,http://localhost:4201,http://127.0.0.1:4200,http://127.0.0.1:4201
```

### Step 2: Install dotenv support (if needed)

If your Spring Boot app doesn't automatically load `.env` files, you may need to add this dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>me.paulschwarz</groupId>
    <artifactId>spring-dotenv</artifactId>
    <version>2.5.4</version>
</dependency>
```

## ☁️ **Render Deployment Setup**

### Step 1: Go to Render Dashboard
1. Log in to [Render](https://render.com/)
2. Go to your backend service
3. Click on "Environment" tab

### Step 2: Add Environment Variables

Add these environment variables in your Render dashboard:

```env
# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here

# Database Configuration
DATABASE_URL=your-mysql-database-url
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password

# JWT Secret
JWT_SECRET=healthbridge-secret-key-2023-very-long-secret-key-for-jwt-token-generation

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_ePOPRenR20mzsg
RAZORPAY_SECRET=WLGtxuC251XBSyZiEwyIR3gA

# Mail Configuration
MAIL_USERNAME=healthbridge13012002@gmail.com
MAIL_PASSWORD=bisvrfctijbvfnbu

# Frontend URL (for production)
FRONTEND_URL=https://healthbridge-frontend-jj1l.onrender.com

# CORS Origins (for production)
CORS_ORIGINS=http://localhost:4200,https://healthbridge-frontend-jj1l.onrender.com

# Port (Render will set this automatically)
PORT=8081
```

## 🔑 **Getting Google OAuth2 Credentials**

### Step 1: Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project or create a new one

### Step 2: Enable Google+ API
1. Go to "APIs & Services" → "Library"
2. Search for "Google+ API" and enable it
3. Also enable "Google OAuth2 API"

### Step 3: Create OAuth2 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add these **Authorized redirect URIs**:
   ```
   http://localhost:8081/login/oauth2/code/google
   https://healthbridge-1-piny.onrender.com/login/oauth2/code/google
   ```
5. Add these **Authorized JavaScript origins**:
   ```
   http://localhost:4200
   https://healthbridge-frontend-jj1l.onrender.com
   ```
6. Copy the Client ID and Client Secret

## 🧪 **Testing Environment Variables**

### Local Testing:
1. Start backend: `cd backend && mvnw.cmd spring-boot:run`
2. Check console for: "OAuth2 client configured successfully"
3. Start frontend: `cd frontend && npm start`
4. Test Google login at: `http://localhost:4200`

### Production Testing:
1. Deploy to Render
2. Check logs for successful startup
3. Test Google login at: `https://healthbridge-frontend-jj1l.onrender.com`

## 🔍 **Troubleshooting**

### Common Issues:
1. **"redirect_uri_mismatch"**: Check Google Console URLs match exactly
2. **"invalid_client"**: Verify Client ID and Secret are correct
3. **Environment variables not loading**: Check `.env` file location and format
4. **CORS errors**: Ensure frontend URL is in CORS origins

### Debug Commands:
```bash
# Check if .env file exists
ls -la backend/.env

# Check environment variables in Spring Boot logs
# Look for: "OAuth2 client configured successfully"
```
