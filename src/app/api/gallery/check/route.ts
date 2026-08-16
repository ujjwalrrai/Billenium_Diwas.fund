import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    
    // List all buckets
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    if (bucketsError) {
      return NextResponse.json({ 
        error: 'Failed to list buckets',
        details: bucketsError.message 
      }, { status: 500 })
    }
    
    // Check if Gallery bucket exists (case-insensitive)
    const galleryBucket = buckets?.find(b => b.name.toLowerCase() === 'gallery')
    
    if (!galleryBucket) {
      return NextResponse.json({ 
        exists: false,
        message: 'Gallery bucket not found',
        availableBuckets: buckets?.map(b => b.name) || []
      })
    }
    
    // List files in Gallery bucket
    const { data: files, error: filesError } = await supabase
      .storage
      .from(galleryBucket.name)
      .list('', {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' }
      })
    
    if (filesError) {
      return NextResponse.json({ 
        exists: true,
        bucket: galleryBucket.name,
        error: 'Failed to list files',
        details: filesError.message
      }, { status: 500 })
    }
    
    // Get public URLs for all image files
    const imageFiles = files?.filter(file => {
      const ext = file.name.toLowerCase()
      return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
             ext.endsWith('.png') || ext.endsWith('.gif') || 
             ext.endsWith('.webp')
    }) || []
    
    const imagesWithUrls = imageFiles.map(file => {
      const { data } = supabase
        .storage
        .from(galleryBucket.name)
        .getPublicUrl(file.name)
      
      return {
        name: file.name,
        url: data.publicUrl,
        created_at: file.created_at,
        size: file.metadata?.size
      }
    })
    
    return NextResponse.json({
      exists: true,
      bucket: galleryBucket.name,
      isPublic: galleryBucket.public,
      fileCount: files?.length || 0,
      imageCount: imageFiles.length,
      images: imagesWithUrls
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
