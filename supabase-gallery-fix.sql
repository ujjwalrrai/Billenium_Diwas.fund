-- =====================================================
-- Gallery Bucket Configuration Fix
-- Run this in Supabase SQL Editor to fix gallery images
-- =====================================================

-- 1. Make Gallery bucket public
UPDATE storage.buckets
SET public = true
WHERE name = 'Gallery';

-- 2. Drop existing policies if any (to avoid conflicts)
DROP POLICY IF EXISTS "Public Access for Gallery Images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view gallery images" ON storage.objects;

-- 3. Create policy for public read access to Gallery bucket
CREATE POLICY "Public Access for Gallery Images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'Gallery');

-- 4. (Optional) Allow authenticated users to upload to Gallery
-- Uncomment the lines below if you want logged-in users to upload images

-- CREATE POLICY "Authenticated users can upload to Gallery"
-- ON storage.objects
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'Gallery');

-- 5. Verify configuration
SELECT 
  name,
  public,
  created_at
FROM storage.buckets
WHERE name = 'Gallery';

-- 6. Check existing policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'objects'
  AND policyname LIKE '%Gallery%';
