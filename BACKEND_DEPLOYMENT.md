# Backend Deployment Guide

## Current Issue

Your frontend is deployed on GitHub Pages and working, but it's trying to connect to `localhost:5000` which doesn't exist in production. You need to deploy your backend to a hosting service.

## Backend Deployment Options

### Option 1: Render (Recommended - Free)

1. **Sign up**: https://render.com
2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Select the `backend` folder
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
3. **Set Environment Variables**:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong random string
   - `PORT`: Leave as default (Render sets this automatically)
4. **Get your backend URL**: `https://your-app-name.onrender.com`

### Option 2: Railway (Free Tier Available)

1. **Sign up**: https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Select your repository** and `backend` folder
4. **Set Environment Variables** (same as above)
5. **Get your backend URL**

### Option 3: Heroku (Paid, but has free alternatives)

1. **Install Heroku CLI**
2. **Login**: `heroku login`
3. **Create app**: `heroku create your-app-name`
4. **Set environment variables**:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_jwt_secret
   ```
5. **Deploy**: `git push heroku main`

### Option 4: MongoDB Atlas + Any Hosting

1. **Create MongoDB Atlas account**: https://www.mongodb.com/cloud/atlas
2. **Create a free cluster**
3. **Get connection string**: `mongodb+srv://username:password@cluster.mongodb.net/database`
4. **Deploy backend** to any hosting service
5. **Use the connection string** as `MONGODB_URI`

## After Deploying Backend

1. **Update Frontend API Config**:
   - Edit `frontend/src/config/api.js`
   - Replace `'https://your-backend-url.herokuapp.com'` with your actual backend URL
   - Example: `'https://expense-tracker-backend.onrender.com'`

2. **Rebuild Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Copy to docs**:
   ```bash
   # From project root
   Copy-Item -Path frontend\build\* -Destination docs\ -Recurse -Force
   ```

4. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Update API URL for production backend"
   git push
   ```

## Quick Setup with Render (Step by Step)

1. Go to https://render.com and sign up/login
2. Click **New +** → **Web Service**
3. Connect your GitHub account and select `Expense-Tracker-` repository
4. Configure:
   - **Name**: `expense-tracker-backend` (or any name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
6. Click **Create Web Service**
7. Wait for deployment (5-10 minutes)
8. Copy the URL (e.g., `https://expense-tracker-backend.onrender.com`)
9. Update `frontend/src/config/api.js` with this URL
10. Rebuild and redeploy frontend

## MongoDB Setup

If you don't have MongoDB yet:

1. **MongoDB Atlas (Free)**:
   - Sign up: https://www.mongodb.com/cloud/atlas/register
   - Create a free cluster
   - Create a database user
   - Whitelist IP: `0.0.0.0/0` (allows all IPs - for production)
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/expense-tracker`

2. **Local MongoDB** (for development only):
   - Install MongoDB locally
   - Use: `mongodb://localhost:27017/expense-tracker`

## Testing

After deployment:

1. **Test Backend Health**:
   - Visit: `https://your-backend-url.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test Frontend**:
   - Visit your GitHub Pages site
   - Try to register/login
   - Should connect to your deployed backend

## Security Notes

- ⚠️ Never commit `.env` files
- ⚠️ Use strong `JWT_SECRET` in production
- ⚠️ Use MongoDB Atlas with proper authentication
- ⚠️ Enable CORS only for your frontend domain in production
