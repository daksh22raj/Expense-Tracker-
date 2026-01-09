# GitHub Pages Setup - Step by Step Guide

## Current Status ✅

Your local `docs` folder is ready with:
- ✅ `index.html` - Main entry point
- ✅ `404.html` - Redirect for client-side routing
- ✅ `.nojekyll` - Disables Jekyll processing
- ✅ All static assets (CSS, JS files)

## Step 1: Verify Files Are Committed

Check if your files are committed to git:

```bash
git status
```

You should see the `docs` folder in the changes. If not, add and commit:

```bash
git add docs/
git add frontend/src/App.js
git add frontend/package.json
git add .nojekyll
git commit -m "Setup GitHub Pages with React Router support"
```

## Step 2: Push to GitHub

```bash
git push origin main
```

(Or `git push origin master` if your default branch is master)

## Step 3: Configure GitHub Pages Source

**IMPORTANT:** This is the most common cause of 404 errors!

1. Go to your repository on GitHub: `https://github.com/daksh22raj/Expense-Tracker-`
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `main` (or `master` if that's your default branch)
   - **Folder**: `/docs` ⚠️ **This is critical!**
5. Click **Save**

## Step 4: Wait for Deployment

- GitHub Pages usually takes 1-5 minutes to build
- You'll see a green checkmark when it's ready
- Check the **Actions** tab to see the build status

## Step 5: Verify Your Site

Visit: `https://daksh22raj.github.io/Expense-Tracker-/`

## Troubleshooting

### Still Getting 404?

1. **Check GitHub Pages Source:**
   - Go to Settings → Pages
   - Make sure it's set to `/docs` folder
   - Not `/ (root)` or `/build`

2. **Verify Files Are on GitHub:**
   - Go to your repository
   - Click on the `docs` folder
   - You should see `index.html`, `404.html`, `.nojekyll`, and `static/` folder
   - If files are missing, they weren't pushed

3. **Check File Names (Case Sensitivity):**
   - Make sure `index.html` is lowercase
   - Make sure `.nojekyll` starts with a dot

4. **Clear Browser Cache:**
   - Hard refresh: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Or try incognito/private mode

5. **Check GitHub Actions:**
   - Go to the **Actions** tab in your repository
   - Look for any failed builds
   - Check for error messages

### Common Issues

**Issue:** "404 File not found"  
**Solution:** GitHub Pages source is not set to `/docs` folder

**Issue:** Site loads but shows blank page  
**Solution:** Check browser console for errors, verify all static files are loading

**Issue:** Routes don't work (404 on /login, etc.)  
**Solution:** Make sure `404.html` is in the docs folder and React Router has basename set

## Quick Verification Checklist

- [ ] `docs/index.html` exists
- [ ] `docs/404.html` exists  
- [ ] `docs/.nojekyll` exists
- [ ] `docs/static/` folder exists with CSS and JS files
- [ ] Files are committed to git (`git status` shows nothing)
- [ ] Files are pushed to GitHub (check on github.com)
- [ ] GitHub Pages is set to `/docs` folder in Settings
- [ ] Waited 2-5 minutes after pushing

## Alternative: Use gh-pages Branch

If `/docs` folder doesn't work, you can use the `gh-pages` branch:

```bash
cd frontend
npm run deploy
```

Then in GitHub Settings → Pages:
- Source: Deploy from a branch
- Branch: `gh-pages` → `/ (root)`
