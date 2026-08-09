'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/women-power', label: 'Women Power' },
  { href: 'https://billenniumdivas.mmbx.in', label: 'Member Login' },
  { href: '/contact', label: 'Contact' },
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

  const mobileMenu = (
    <div className={`${styles.mobileNav} ${open ? styles.open : ''}`}>
      {NAV_LINKS.map((link) => (
        <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
          {link.label}
        </Link>
      ))}
      <Link href="#" className={styles.mobileCta} onClick={() => setOpen(false)}>
        Nominate Now
      </Link>
    </div>
  );

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.wrap}`}>
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