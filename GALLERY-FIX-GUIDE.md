# Gallery Images Not Showing on Vercel - Troubleshooting Guide

## Problem
Gallery images from Supabase Storage are visible on localhost but not on Vercel deployment.

## Quick Fix Checklist

### 1. Make Gallery Bucket Public (MOST IMPORTANT)

**Option A: Via Supabase Dashboard**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Storage** → **Buckets**
4. Find the "Gallery" bucket
5. Click the 3-dot menu → **Edit bucket**
6. Enable "Public bucket" checkbox
7. Click **Save**

**Option B: Via SQL (Recommended)**
1. Go to **SQL Editor** in Supabase Dashboard
2. Run the SQL from `supabase-gallery-fix.sql`:
```sql
-- Make Gallery bucket public
UPDATE storage.buckets
SET public = true
WHERE name = 'Gallery';

-- Add policy for public read access
CREATE POLICY "Public Access for Gallery Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'Gallery');
```

### 2. Verify Environment Variables on Vercel

Go to your Vercel project → **Settings** → **Environment Variables**

Required variables:
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key  
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- ✅ `NEXT_PUBLIC_APP_URL` - Your Vercel URL (e.g., `https://your-app.vercel.app`)

**After adding/updating variables:**
- Go to **Deployments** tab
- Click the 3-dot menu on the latest deployment
- Select **Redeploy**

### 3. Check CORS Configuration

1. Supabase Dashboard → **Settings** → **API**
2. Scroll to **CORS Configuration**
3. Add your Vercel domain:
   - `https://your-app.vercel.app`
   - `https://*.vercel.app` (for preview deployments)

### 4. Verify Bucket Structure

Run the diagnostic API on your Vercel deployment:
```
https://your-app.vercel.app/api/gallery/diagnose
```

This will show:
- ✅ Environment variables status
- ✅ Bucket existence and public status
- ✅ Sample image URLs
- ✅ Configuration recommendations

### 5. Check Image URLs

Image URLs should follow this format:
```
https://[PROJECT-REF].supabase.co/storage/v1/object/public/Gallery/[image-name].jpg
```

If URLs are missing `/public/`, the bucket is not public.

## Common Issues

### Issue 1: Bucket Not Public
**Symptoms:** Images return 404 or access denied
**Fix:** Run the SQL from `supabase-gallery-fix.sql`

### Issue 2: Missing Environment Variables
**Symptoms:** API returns 500 error or "configuration error"
**Fix:** Add all required environment variables in Vercel and redeploy

### Issue 3: Wrong Bucket Name
**Symptoms:** "Gallery bucket not found" error
**Fix:** Check the actual bucket name in Supabase Storage (case-sensitive)

### Issue 4: CORS Errors
**Symptoms:** Browser console shows CORS policy errors
**Fix:** Add Vercel domain to Supabase CORS settings

### Issue 5: Stale Build Cache
**Symptoms:** Changes not reflecting after deployment
**Fix:** Clear build cache in Vercel:
  - Settings → General → Clear Build Cache
  - Redeploy

## Testing Steps

1. **Test locally first:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000/women-power

2. **Test diagnostic API locally:**
   ```bash
   curl http://localhost:3000/api/gallery/diagnose
   ```

3. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "Fix gallery images configuration"
   git push
   ```

4. **Test diagnostic API on Vercel:**
   ```
   https://your-app.vercel.app/api/gallery/diagnose
   ```

5. **Check Women Power page:**
   ```
   https://your-app.vercel.app/women-power
   ```

## Verification

After applying the fix, verify:
- [ ] Gallery bucket shows as "public" in Supabase Dashboard
- [ ] All environment variables are set in Vercel
- [ ] Diagnostic API returns `"bucketIsPublic": true`
- [ ] Image URLs include `/public/` in the path
- [ ] Images load in browser (no 404 errors)
- [ ] No CORS errors in browser console

## Need More Help?

1. Check Vercel deployment logs:
   - Vercel Dashboard → Deployments → Click deployment → Functions
   - Look for errors in API route logs

2. Check Supabase logs:
   - Supabase Dashboard → Logs → API Logs
   - Filter for storage-related errors

3. Check browser console:
   - Open DevTools (F12) → Console tab
   - Look for failed network requests

## Prevention

To avoid this issue in the future:
- Always make Gallery/public buckets public from the start
- Set up environment variables before first deployment
- Test on Vercel preview deployments before production
- Keep a backup of your Supabase configuration
