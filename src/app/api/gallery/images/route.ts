import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// Enable caching for production, revalidate every 5 minutes
export const revalidate = 300

export async function GET() {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json({ 
        error: 'Server configuration error',
        details: 'Missing required environment variables',
        images: []
      }, { status: 500 })
    }

    const supabase = createAdminClient()
    
    // First, check if Gallery bucket exists
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    if (bucketsError) {
      console.error('Failed to list buckets:', bucketsError)
      return NextResponse.json({ 
        error: 'Failed to access storage',
        details: bucketsError.message,
        images: []
      }, { status: 500 })
    }

    // Find Gallery bucket (case-insensitive)
    const galleryBucket = buckets?.find(b => b.name.toLowerCase() === 'gallery')
    
    if (!galleryBucket) {
      console.error('Gallery bucket not found. Available buckets:', buckets?.map(b => b.name))
      return NextResponse.json({ 
        error: 'Gallery bucket not found',
        availableBuckets: buckets?.map(b => b.name) || [],
        images: []
      }, { status: 404 })
    }

    // Check if bucket is public
    if (!galleryBucket.public) {
      console.warn('Gallery bucket is not public! Images may not be accessible.')
    }
    
    // List files from Gallery bucket
    const { data: files, error: filesError } = await supabase
      .storage
      .from(galleryBucket.name)
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'asc' }
      })
    
    if (filesError) {
      console.error('Failed to list files in Gallery bucket:', filesError)
      return NextResponse.json({ 
        error: 'Failed to fetch gallery images',
        details: filesError.message,
        images: []
      }, { status: 500 })
    }
    
    // Filter only image files
    const imageFiles = files?.filter(file => {
      const ext = file.name.toLowerCase()
      return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
             ext.endsWith('.png') || ext.endsWith('.gif') || 
             ext.endsWith('.webp')
    }) || []
    
    console.log(`Found ${imageFiles.length} images in Gallery bucket`)
    
    // Get public URLs for all images
    const images = imageFiles.map(file => {
      const { data } = supabase
        .storage
        .from(galleryBucket.name)
        .getPublicUrl(file.name)
      
      return data.publicUrl
    })
    
    return NextResponse.json({
      success: true,
      count: images.length,
      bucketIsPublic: galleryBucket.public,
      images
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }
    })
  } catch (error) {
    console.error('Error in gallery images API:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      images: []
    }, { status: 500 })
  }
}
