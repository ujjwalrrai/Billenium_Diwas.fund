'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './TiltedGallery.module.css';

interface TiltedGalleryProps {
  images: string[];
}

export default function TiltedGallery({ images }: TiltedGalleryProps) {
  const [rows, setRows] = useState<string[][]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Split images into 5 rows
    const numRows = 5;
    const newRows: string[][] = Array.from({ length: numRows }, () => []);
    
    images.forEach((img, idx) => {
      newRows[idx % numRows].push(img);
    });
    
    // Duplicate images for infinite scroll effect
    setRows(newRows.map(row => [...row, ...row, ...row]));
  }, [images]);

  useEffect(() => {
    // Disable parallax on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      return; // Skip parallax on mobile
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      rowRefs.current.forEach((row, idx) => {
        if (row) {
          // Alternate scroll directions
          const direction = idx % 2 === 0 ? 1 : -1;
          const speed = 0.3 + (idx * 0.1);
          row.style.transform = `translateX(${direction * scrollY * speed}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleImageError = (imgUrl: string) => {
    setImageErrors(prev => new Set(prev).add(imgUrl));
    console.error('Failed to load image:', imgUrl);
  };

  // If no images, show placeholder
  if (images.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.emptyState}>
          <p>No gallery images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryInner}>
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            ref={el => { rowRefs.current[rowIdx] = el; }}
            className={styles.galleryRow}
            style={{
              animationDelay: `${rowIdx * -2}s`,
              animationDirection: rowIdx % 2 === 0 ? 'normal' : 'reverse'
            }}
          >
            {row.map((imgUrl, imgIdx) => {
              // Skip images that failed to load
              if (imageErrors.has(imgUrl)) {
                return null;
              }

              return (
                <div key={`${rowIdx}-${imgIdx}`} className={styles.galleryItem}>
                  {/* Use regular img for Supabase images as Next.js Image may have issues with remote patterns */}
                  <img
                    src={imgUrl}
                    alt={`Gallery image ${imgIdx + 1}`}
                    loading="lazy"
                    onError={() => handleImageError(imgUrl)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
