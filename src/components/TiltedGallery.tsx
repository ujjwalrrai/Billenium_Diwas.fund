'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TiltedGallery.module.css';

interface TiltedGalleryProps {
  images: string[];
}

export default function TiltedGallery({ images }: TiltedGalleryProps) {
  const [rows, setRows] = useState<string[][]>([]);
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
            {row.map((imgUrl, imgIdx) => (
              <div key={`${rowIdx}-${imgIdx}`} className={styles.galleryItem}>
                <img
                  src={imgUrl}
                  alt={`Gallery image ${imgIdx + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
