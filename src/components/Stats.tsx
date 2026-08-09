'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Stats.module.css';

const STATS = [
  { value: 120, suffix: '+', label: 'Mentors Onboard' },
  { value: 340, suffix: '+', label: 'Startups Engaged' },
  { value: 8500, suffix: '+', label: 'Women Participants Engaged' },
  { value: 2600, suffix: '+', label: 'Mentoring Engagements' },
  { value: 65, suffix: '+', label: 'Investors Onboard' },
  { value: 45, suffix: '+', label: 'Workshops Conducted' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={styles.num}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className={styles.section}>
      <span className={styles.watermark} aria-hidden="true">B</span>
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>The Experience</span>
          <h2 className={styles.title}>Mapping our journey</h2>
        </div>
        <div className={styles.grid}>
          {STATS.map((s) => (
            <div className={styles.stat} key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <div className={styles.label}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
