# Vercel Deployment Guide for Paintsurgeon

## Prerequisites
- A GitHub account
- A Vercel account (sign up at https://vercel.com)

## Step 1: Push Your Code to GitHub

If you haven't already, initialize a git repository and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit - Paintsurgeon website"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)
   - **Install Command**: `npm install` (should be auto-detected)

5. Add Environment Variables (if using Web3Forms):
   - Click "Environment Variables"
   - Add: `VITE_WEB3FORMS_KEY` = `your_access_key_here`

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 3: Configure Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain (e.g., paintsurgeon.com)
3. Follow the DNS configuration instructions provided by Vercel
4. Update the canonical URL in `index.html` to your custom domain

## Step 4: Update SEO After Deployment

Once deployed, update these files with your actual domain:

### In `index.html`:
- Replace `https://paintsurgeon.com` with your actual Vercel URL or custom domain
- Update all `og:url` and `twitter:url` meta tags
- Update the canonical link

### In `public/sitemap.xml`:
- Replace all instances of `https://paintsurgeon.com` with your actual domain

### In `public/robots.txt`:
- Update the Sitemap URL to your actual domain

## Step 5: Test Your Deployment

After deployment, test:
- ✅ All pages load correctly (Home, About, Services, Portfolio, Contact)
- ✅ Navigation works
- ✅ Images load properly
- ✅ Contact form submits (if Web3Forms is configured)
- ✅ WhatsApp links work with pre-written messages
- ✅ TikTok link in footer works
- ✅ Mobile responsiveness

## Automatic Deployments

Vercel will automatically deploy:
- **Production**: When you push to the `main` branch
- **Preview**: When you create a pull request

## Environment Variables

If you need to add the Web3Forms access key:

1. Go to your Vercel project dashboard
2. Navigate to "Settings" → "Environment Variables"
3. Add: `VITE_WEB3FORMS_KEY` with your access key
4. Redeploy the project

## Troubleshooting

### Routes not working (404 errors)
- The `vercel.json` file should handle this automatically
- Make sure it's committed to your repository

### Images not loading
- Check that all image paths are correct
- Ensure images are in the `src/assets` folder
- Vite should handle asset optimization automatically

### Build fails
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Try building locally first: `npm run build`

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Compression
- ✅ Edge caching

## Your Deployment URLs

After deployment, you'll get:
- **Production URL**: `https://your-project-name.vercel.app`
- **Custom Domain**: Configure in Vercel dashboard

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
