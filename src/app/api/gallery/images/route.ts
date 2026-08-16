import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    
    // List files from Gallery bucket
    const { data: files, error: filesError } = await supabase
      .storage
      .from('Gallery')
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'asc' }
      })
    
    if (filesError) {
      return NextResponse.json({ 
        error: 'Failed to fetch gallery images',
        details: filesError.message 
      }, { status: 500 })
    }
    
    // Filter only image files
    const imageFiles = files?.filter(file => {
      const ext = file.name.toLowerCase()
      return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
             ext.endsWith('.png') || ext.endsWith('.gif') || 
             ext.endsWith('.webp')
    }) || []
    
    // Get public URLs for all images
    const images = imageFiles.map(file => {
      const { data } = supabase
        .storage
        .from('Gallery')
        .getPublicUrl(file.name)
      
      return data.publicUrl
    })
    
    return NextResponse.json({
      success: true,
      count: images.length,
      images
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
