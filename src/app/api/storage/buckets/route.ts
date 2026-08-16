import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // List all buckets
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()
    
    if (bucketsError) {
      return NextResponse.json({ error: bucketsError.message }, { status: 500 })
    }
    
    // Check if Gallery bucket exists
    const galleryBucket = buckets?.find(b => b.name === 'Gallery' || b.name === 'gallery')
    
    if (!galleryBucket) {
      return NextResponse.json({ 
        error: 'Gallery bucket not found',
        availableBuckets: buckets?.map(b => b.name) || []
      }, { status: 404 })
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
        error: filesError.message,
        bucket: galleryBucket.name
      }, { status: 500 })
    }
    
    return NextResponse.json({
      bucket: galleryBucket.name,
      fileCount: files?.length || 0,
      files: files || []
    })
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
