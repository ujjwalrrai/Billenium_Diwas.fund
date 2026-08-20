# Fix Gallery Images on Vercel - Quick Guide

## What Happened?

Your recent TypeScript fixes **did NOT break** the gallery. They just exposed an existing issue:

**Your Gallery bucket in Supabase is NOT PUBLIC** 🔒

### Why localhost works but Vercel doesn't:

- **Localhost**: Uses admin credentials (SUPABASE_SERVICE_ROLE_KEY) → can access private buckets ✅
- **Vercel**: Generated public URLs need bucket to be public → fails on private buckets ❌

## The Fix (3 Steps - Takes 2 Minutes)

### Step 1: Make Gallery Bucket Public

Go to Supabase Dashboard: https://supabase.com/dashboard

**SQL Editor** → Run this:

```sql
-- Make Gallery bucket public
UPDATE storage.buckets 
SET public = true 
WHERE name = 'Gallery';

-- Allow public read access
CREATE POLICY "Public Access for Gallery Images"
ON storage.objects 
FOR SELECT
USING (bucket_id = 'Gallery');
```

Click **Run** ✅

### Step 2: Verify in Vercel Environment Variables

Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

Make sure these are set:
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Redeploy

Vercel Dashboard → **Deployments** → Click **...** on latest → **Redeploy**

## Test It

After redeploying, visit:

**Diagnostic page:**
```
https://your-app.vercel.app/api/gallery/diagnose
```

Should show: `"bucketIsPublic": true` ✅

**Women Power page:**
```
https://your-app.vercel.app/women-power
```

Images should load! 🎉

## Verify It Worked

You'll know it's fixed when:
- [ ] No "No gallery images available" message
- [ ] Images appear in the tilted gallery
- [ ] No 404 errors in browser console (F12 → Console tab)
- [ ] Image URLs include `/public/` in the path

## What If It Still Doesn't Work?

1. Check browser console (F12) for errors
2. Visit `/api/gallery/diagnose` and share the output
3. Verify Gallery bucket shows "Public: Yes" in Supabase Dashboard

---

**TL;DR**: Your code changes were good! The bucket just needs to be public. Run the SQL above and redeploy.
