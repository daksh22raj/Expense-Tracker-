# Quick Fix: Backend Connection Error

## The Problem

Your frontend is deployed on GitHub Pages, but it's trying to connect to `localhost:5000` which doesn't work in production. You need to:

1. **Deploy your backend** to a hosting service
2. **Update the API URL** in your frontend code

## Quick Solution (5 minutes)

### Step 1: Deploy Backend to Render (Free)

1. Go to https://render.com and sign up/login
2. Click **New +** → **Web Service**
3. Connect GitHub and select your repository
4. Configure:
   - **Name**: `expense-tracker-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string (get from MongoDB Atlas)
   - `JWT_SECRET`: Run this to generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
6. Click **Create Web Service**
7. Wait 5-10 minutes, then copy your URL (e.g., `https://expense-tracker-backend.onrender.com`)

### Step 2: Update Frontend API URL

1. Edit `frontend/src/config/api.js`
2. Find this line:
   ```javascript
   const PRODUCTION_BACKEND_URL = 'YOUR_BACKEND_URL_HERE';
   ```
3. Replace `'YOUR_BACKEND_URL_HERE'` with your Render URL:
   ```javascript
   const PRODUCTION_BACKEND_URL = 'https://expense-tracker-backend.onrender.com';
   ```

### Step 3: Rebuild and Deploy Frontend

```bash
cd frontend
npm run build
cd ..
Copy-Item -Path frontend\build\* -Destination docs\ -Recurse -Force
git add .
git commit -m "Update backend API URL for production"
git push
```

### Step 4: Wait and Test

- Wait 2-5 minutes for GitHub Pages to rebuild
- Visit your site and try registering
- Should now connect to your deployed backend!

## MongoDB Setup (If Needed)

If you don't have MongoDB:

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster
4. Create a database user
5. Whitelist IP: `0.0.0.0/0` (allows all IPs)
6. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/expense-tracker`
7. Use this as `MONGODB_URI` in Render

## That's It!

Your app should now work end-to-end:
- Frontend: GitHub Pages ✅
- Backend: Render ✅
- Database: MongoDB Atlas ✅
