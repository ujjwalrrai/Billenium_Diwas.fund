import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import { client } from './client'

const builder = createImageUrlBuilder(client)

/**
 * Generate image URLs from Sanity image objects
 * @param source - Sanity image object
 * @returns Image URL builder
 */
export function urlFor(source: Image) {
  return builder.image(source)
}

/**
 * Get optimized image URL with width and format
 * @param source - Sanity image object
 * @param width - Desired width
 * @returns Optimized image URL
 */
export function getImageUrl(source: Image, width?: number) {
  let imageBuilder = urlFor(source).auto('format').fit('max')
  
  if (width) {
    imageBuilder = imageBuilder.width(width)
  }
  
  return imageBuilder.url()
}
