# GitHub Pages Deployment Guide

## Current Setup

Your project is configured for GitHub Pages deployment. Here's what has been set up:

### Files Created/Updated:
- ✅ `.nojekyll` in root - Disables Jekyll processing
- ✅ `docs/.nojekyll` - Ensures static files are served correctly
- ✅ `docs/` folder - Contains the built React app
- ✅ `frontend/package.json` - Configured with correct `homepage` field

## GitHub Pages Configuration

### Option 1: Using `docs` folder (Recommended)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/docs`
4. Click **Save**

Your site will be available at: `https://daksh22raj.github.io/Expense-Tracker-/`

### Option 2: Using `gh-pages` branch

If you prefer to use a separate branch:

```bash
cd frontend
npm run deploy
```

This will:
1. Build your React app
2. Create/update the `gh-pages` branch
3. Push the build files to that branch

Then in GitHub Settings → Pages:
- **Source**: Deploy from a branch
- **Branch**: `gh-pages` → `/ (root)`

## After Deployment

1. **Commit and push the updated files**:
   ```bash
   git add .
   git commit -m "Fix GitHub Pages deployment"
   git push
   ```

2. **Wait 1-2 minutes** for GitHub Pages to rebuild

3. **Visit your site**: `https://daksh22raj.github.io/Expense-Tracker-/`

## Troubleshooting

### Still getting 404?

1. **Check GitHub Pages source**: Make sure it's set to `/docs` folder (if using Option 1)
2. **Verify files exist**: The `docs` folder should contain `index.html`
3. **Check build paths**: The `index.html` should have paths like `/Expense-Tracker-/static/...`
4. **Wait a few minutes**: GitHub Pages can take 1-5 minutes to update

### Updating the Site

Whenever you make changes:

1. Make your code changes
2. Rebuild:
   ```bash
   cd frontend
   npm run build
   ```
3. Copy to docs:
   ```bash
   # From project root
   Copy-Item -Path frontend\build\* -Destination docs\ -Recurse -Force
   ```
4. Commit and push:
   ```bash
   git add docs/
   git commit -m "Update deployed site"
   git push
   ```

Or use the deploy script:
```bash
cd frontend
npm run deploy
```
(Then configure GitHub Pages to use `gh-pages` branch)

## Notes

- The `homepage` field in `package.json` is set to your GitHub Pages URL
- The `.nojekyll` files prevent Jekyll from processing your React app
- The `docs` folder contains the production build of your React app
