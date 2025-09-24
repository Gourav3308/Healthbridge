# Google OAuth2 Setup Guide

## 🎯 Required URLs for Google Cloud Console

### Authorized Redirect URIs:
```
http://localhost:8081/login/oauth2/code/google
https://healthbridge-1-piny.onrender.com/login/oauth2/code/google
```

### Authorized JavaScript Origins:
```
http://localhost:4200
https://healthbridge-frontend-jj1l.onrender.com
```

## 🔧 Environment Variables Setup

### For Local Development:
Create a `.env` file in the `backend/` directory:

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
```

### For Render Deployment:
Set these environment variables in your Render dashboard:

```env
GOOGLE_CLIENT_ID=your-actual-google-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret-here
DATABASE_URL=your-mysql-database-url
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
JWT_SECRET=your-jwt-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_SECRET=your-razorpay-secret
MAIL_USERNAME=your-email
MAIL_PASSWORD=your-app-password
```

## 🚀 Testing Steps

### Local Testing:
1. Start backend: `cd backend && mvnw.cmd spring-boot:run`
2. Start frontend: `cd frontend && npm start`
3. Navigate to: `http://localhost:4200`
4. Try Google login

### Production Testing:
1. Deploy to Render
2. Navigate to: `https://healthbridge-frontend-jj1l.onrender.com`
3. Try Google login

## 🔍 Troubleshooting

### Common Issues:
1. **"redirect_uri_mismatch"**: Check that URLs in Google Console match exactly
2. **"invalid_client"**: Verify client ID and secret are correct
3. **CORS errors**: Ensure frontend URL is in CORS allowed origins

### Debug Steps:
1. Check browser console for errors
2. Check backend logs for OAuth2 errors
3. Verify environment variables are loaded correctly
4. Test with both HTTP (local) and HTTPS (production) URLs
