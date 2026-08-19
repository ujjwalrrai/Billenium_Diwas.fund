# Vercel Deployment Guide & Troubleshooting

## Environment Variables Setup

### Required Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://hkxgdrjuvlxwvmulzgco.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SANITY_PROJECT_ID=wdb0a8s2
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-token
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.google.com/your-form-url
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Important Notes:

1. **NEXT_PUBLIC_APP_URL**: Set this to your actual Vercel domain (e.g., `https://billennium-divas.vercel.app`)
2. **NEXT_PUBLIC_GOOGLE_FORM_URL**: The full URL to your Google Form
3. All variables with `NEXT_PUBLIC_` prefix are exposed to the browser
4. **Never** expose `SUPABASE_SERVICE_ROLE_KEY` or `SANITY_API_TOKEN` in client-side code

## Fixing Image Loading Issues

### Issue: Images from Supabase not loading

#### Solution 1: Check Supabase Bucket Permissions

1. Go to Supabase Dashboard → Storage → Gallery bucket
2. Make sure the bucket is **PUBLIC**
3. Click on the bucket → Settings → Make sure "Public bucket" is enabled

#### Solution 2: Verify Bucket Name

The code looks for a bucket named `Gallery` (case-sensitive). Check that:
- Bucket exists in Supabase Storage
- Bucket name matches exactly: `Gallery`
- Bucket contains image files (.jpg, .jpeg, .png, .gif, .webp)

#### Solution 3: Check CORS Settings

If images still don't load, check browser console for CORS errors. In Supabase:
1. Go to Settings → API
2. Check CORS settings allow your Vercel domain

#### Solution 4: Check Next.js Image Configuration

In `next.config.ts`, verify the Supabase domain is in `remotePatterns`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'hkxgdrjuvlxwvmulzgco.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
}
```

## Testing the Gallery API

### Test if images are being fetched:

```bash
# Local
curl http://localhost:3000/api/gallery/images

# Production
curl https://your-domain.vercel.app/api/gallery/images
```

Expected response:
```json
{
  "success": true,
  "count": 10,
  "images": [
    "https://hkxgdrjuvlxwvmulzgco.supabase.co/storage/v1/object/public/Gallery/image1.jpg",
    "..."
  ]
}
```

### Check bucket status:

```bash
curl https://your-domain.vercel.app/api/gallery/check
```

This will show:
- If Gallery bucket exists
- How many files are in it
- If it's public
- URLs for each image

## Common Issues & Fixes

### 1. Google Form not opening

**Symptom**: Form link doesn't work in production

**Fix**: 
- Add `NEXT_PUBLIC_GOOGLE_FORM_URL` to Vercel environment variables
- Make sure the Google Form is set to "Anyone with the link can respond"
- Redeploy after adding environment variables

### 2. Images show broken icon

**Possible causes**:
- Gallery bucket doesn't exist in Supabase
- Bucket is not public
- No images uploaded to bucket
- Wrong Supabase URL in environment variables

**Debug**:
1. Visit `/api/gallery/check` to see bucket status
2. Check browser DevTools Network tab for failed image requests
3. Verify image URLs are valid by opening them directly

### 3. API routes return errors

**Symptom**: `/api/gallery/images` returns 500 error

**Possible causes**:
- `SUPABASE_SERVICE_ROLE_KEY` not set in Vercel
- Supabase credentials are incorrect
- Bucket permissions issue

**Fix**:
1. Check Vercel logs: `vercel logs your-deployment-url`
2. Verify all environment variables are set
3. Check Supabase API keys are correct

### 4. Environment variables not updating

**Issue**: Changed env vars but still seeing old behavior

**Fix**:
- Environment variables require a new deployment to take effect
- In Vercel: Settings → Environment Variables → Edit → Save
- Then: Deployments → Three dots menu → Redeploy

## Deployment Checklist

Before deploying, ensure:

- [ ] All environment variables set in Vercel
- [ ] `NEXT_PUBLIC_APP_URL` matches your Vercel domain
- [ ] Supabase Gallery bucket exists and is public
- [ ] Images uploaded to Gallery bucket
- [ ] Google Form URL is correct and form is public
- [ ] Supabase RLS policies allow public read for Gallery bucket
- [ ] Next.js config has correct Supabase domain in `remotePatterns`

## Manual Supabase Gallery Bucket Setup

If bucket doesn't exist, create it:

### Via Supabase Dashboard:
1. Go to Storage → Create bucket
2. Name: `Gallery`
3. Enable "Public bucket"
4. Upload images

### Via SQL:
```sql
-- Create public Gallery bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('Gallery', 'Gallery', true);

-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'Gallery' );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'Gallery' AND auth.role() = 'authenticated' );
```

## Still Having Issues?

1. **Check Vercel Logs**:
   - Go to your deployment in Vercel
   - Click on "Functions" or "Logs" tab
   - Look for error messages

2. **Check Browser Console**:
   - Open DevTools → Console
   - Look for network errors or CORS issues

3. **Test API Routes Directly**:
   - Visit `https://your-domain.vercel.app/api/gallery/check`
   - This shows detailed info about your gallery setup

4. **Contact Support**:
   - Check Supabase logs in Dashboard → Logs
   - Verify Supabase project is not paused (free tier)
