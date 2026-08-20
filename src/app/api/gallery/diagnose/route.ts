import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    
    // Check environment variables
    const envCheck = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
    }
    
    // List all buckets
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    if (bucketsError) {
      return NextResponse.json({ 
        error: 'Failed to list buckets',
        details: bucketsError.message,
        env: envCheck
      }, { status: 500 })
    }
    
    // Find Gallery bucket
    const galleryBucket = buckets?.find(b => b.name.toLowerCase() === 'gallery')
    
    if (!galleryBucket) {
      return NextResponse.json({ 
        error: 'Gallery bucket not found',
        availableBuckets: buckets?.map(b => ({ name: b.name, public: b.public })) || [],
        env: envCheck
      }, { status: 404 })
    }
    
    // List files in Gallery bucket
    const { data: files, error: filesError } = await supabase
      .storage
      .from(galleryBucket.name)
      .list('', {
        limit: 10,
        sortBy: { column: 'name', order: 'asc' }
      })
    
    if (filesError) {
      return NextResponse.json({ 
        error: 'Failed to list files in Gallery bucket',
        bucket: galleryBucket.name,
        isPublic: galleryBucket.public,
        details: filesError.message,
        env: envCheck
      }, { status: 500 })
    }
    
    // Get URLs for a sample image
    const sampleImage = files?.find(f => {
      const ext = f.name.toLowerCase()
      return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png')
    })
    
    let sampleUrls = null
    if (sampleImage) {
      const { data: publicUrl } = supabase
        .storage
        .from(galleryBucket.name)
        .getPublicUrl(sampleImage.name)
      
      sampleUrls = {
        fileName: sampleImage.name,
        publicUrl: publicUrl.publicUrl,
        testUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${galleryBucket.name}/${sampleImage.name}`
      }
    }
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: envCheck,
      bucket: {
        name: galleryBucket.name,
        isPublic: galleryBucket.public,
        fileCount: files?.length || 0,
      },
      sampleImage: sampleUrls,
      recommendation: !galleryBucket.public 
        ? 'WARNING: Gallery bucket is not public! Images will not be accessible via public URLs.'
        : 'Gallery bucket is correctly configured as public.'
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
