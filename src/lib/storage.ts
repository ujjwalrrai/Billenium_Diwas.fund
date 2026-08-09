import { createClient } from '@/lib/supabase/server'

/**
 * Upload a file to Supabase Storage
 * @param bucket - Storage bucket name (pitch-decks, avatars, logos)
 * @param path - File path within the bucket
 * @param file - File to upload
 * @returns Storage path or error
 */
export async function uploadFile(
  bucket: 'pitch-decks' | 'avatars' | 'logos',
  path: string,
  file: File
) {
  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }

  return data
}

/**
 * Get a public URL for a file in a public bucket
 * @param bucket - Storage bucket name (avatars, logos)
 * @param path - File path within the bucket
 * @returns Public URL
 */
export async function getPublicUrl(
  bucket: 'avatars' | 'logos',
  path: string
) {
  const supabase = await createClient()

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return data.publicUrl
}

/**
 * Get a signed URL for a private file
 * @param bucket - Storage bucket name (pitch-decks)
 * @param path - File path within the bucket
 * @param expiresIn - URL expiration time in seconds (default: 60)
 * @returns Signed URL
 */
export async function getSignedUrl(
  bucket: 'pitch-decks',
  path: string,
  expiresIn: number = 60
) {
  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn)

  if (error) {
    throw new Error(`Failed to create signed URL: ${error.message}`)
  }

  return data.signedUrl
}

/**
 * Delete a file from storage
 * @param bucket - Storage bucket name
 * @param path - File path within the bucket
 */
export async function deleteFile(
  bucket: 'pitch-decks' | 'avatars' | 'logos',
  path: string
) {
  const supabase = await createClient()

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    throw new Error(`Delete failed: ${error.message}`)
  }
}

/**
 * Upload avatar for current user
 * @param file - Image file
 * @param userId - User ID
 * @returns Public URL
 */
export async function uploadAvatar(file: File, userId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/avatar.${fileExt}`

  await uploadFile('avatars', fileName, file)
  return getPublicUrl('avatars', fileName)
}

/**
 * Upload logo for a startup
 * @param file - Image file
 * @param userId - User ID
 * @param startupId - Startup ID
 * @returns Public URL
 */
export async function uploadLogo(file: File, userId: string, startupId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${startupId}/logo.${fileExt}`

  await uploadFile('logos', fileName, file)
  return getPublicUrl('logos', fileName)
}

/**
 * Upload pitch deck for a startup
 * @param file - PDF file
 * @param userId - User ID
 * @param startupId - Startup ID
 * @returns Storage path
 */
export async function uploadPitchDeck(file: File, userId: string, startupId: string) {
  const fileName = `${userId}/${startupId}/${file.name}`

  return uploadFile('pitch-decks', fileName, file)
}
