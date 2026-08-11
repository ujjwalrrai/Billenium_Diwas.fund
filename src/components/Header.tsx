'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/', label: 'About' },
  { href: '/', label: 'Women Power' },
  { href: '/', label: 'Member Login' },
  { href: '/', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const mobileMenu = (
    <>
      <div
        className={`${styles.mobileNavOverlay} ${open ? styles.open : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`${styles.mobileNav} ${open ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button
          className={styles.mobileNavClose}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.mobileNavInner}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={styles.mobileNavLink}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#"
            className={styles.mobileCta}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${80 + NAV_LINKS.length * 45}ms` : '0ms' }}
          >
            Nominate Now
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.wrap}>
        <div className={styles.pill}>
          <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Billennium Divas"
              width={120}
              height={60}
              className={styles.logoImg}
              priority
            />
          </Link>

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="#" className={styles.cta}>
            <span>Nominate Now</span>
          </Link>

          <button
            className={`${styles.menuBtn} ${open ? styles.menuBtnOpen : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {mounted && createPortal(mobileMenu, document.body)}
    </header>
  );
}