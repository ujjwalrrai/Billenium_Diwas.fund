'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './about.module.css';

function AnimatedNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
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
          const duration = 1300;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(eased * value);
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplay(value);
            }
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
    <span ref={ref}>
      {prefix && <span className={styles.impactSymbol}>{prefix}</span>}
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix && <span className={styles.impactSymbol}>{suffix}</span>}
    </span>
  );
}

export default function ImpactStats() {
  return (
    <div className={styles.impactPanel}>
      {/* Source: Kalaari Capital CXXO initiative, "The ₹4 Problem: Women
          Founders and the Market Gap Hiding in Plain Sight" (2026) —
          for every ₹100 raised by founders in India's core startup
          networks, women founders receive just ₹4. */}
      <div className={styles.impactRow}>
        <div className={styles.impactNum}>
          <AnimatedNumber value={4} prefix="₹" />
        </div>
        <p className={styles.impactLabel}>
          Raised by women founders for every <strong>₹100</strong> raised by men through
          India&apos;s core startup networks — the &ldquo;₹4 Problem,&rdquo; Kalaari Capital
          CXXO, 2026.
        </p>
      </div>

      <div className={styles.impactDivider} />

      {/* Source: Ministry of Statistics and Programme Implementation,
          Sixth Economic Census. */}
      <div className={styles.impactRow}>
        <div className={styles.impactNum}>
          <AnimatedNumber value={14} suffix="%" />
        </div>
        <p className={styles.impactLabel}>
          Of India&apos;s entrepreneurs are women — 8.05M of 58.5M, per the Sixth Economic
          Census.
        </p>
      </div>

      <div className={styles.impactDivider} />

      {/* Source: reporting on India VC allocation by founding-team
          composition, 2025 — all-women founding teams vs. mixed-gender
          teams. See Kalaari CXXO / trade press coverage of the ₹4 Problem
          report. */}
      <div className={styles.impactCompare}>
        <div className={styles.impactCompareItem}>
          <div className={styles.impactNumSm}>
            <AnimatedNumber value={2.3} decimals={1} suffix="%" />
          </div>
          <span className={styles.impactCompareLabel}>VC funding share — all-women founding teams</span>
        </div>
        <div className={styles.impactCompareItem}>
          <div className={styles.impactNumSm}>
            <AnimatedNumber value={23} suffix="%" />
          </div>
          <span className={styles.impactCompareLabel}>VC funding share — mixed-gender founding teams</span>
        </div>
      </div>

      <p className={styles.impactNote}>There are miles to go before we sleep.</p>
    </div>
  );
}