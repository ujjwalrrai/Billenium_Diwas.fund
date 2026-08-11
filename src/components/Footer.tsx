import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.watermark} aria-hidden="true">B</span>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.brand}>Billennium Divas</div>
            <p className={styles.tag}>
              Womenpreneurship. Power, Unleashed. An early-stage micro-equity fund
              investing in exceptionally talented women entrepreneurs across India.
            </p>
          </div>

          <div>
            <div className={styles.colTitle}>Explore</div>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/">About</Link></li>
              <li><Link href="/">Women Power</Link></li>
              <li><Link href="/">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className={styles.colTitle}>Reach Us</div>
            <ul className={styles.links}>
              <li><a href="mailto:info@billenniumdivas.fund">info@billenniumdivas.fund</a></li>
              <li><a href="mailto:pitch@billenniumdivas.fund">pitch@billenniumdivas.fund</a></li>
              <li><a href="https://billenniumdivas.mmbx.in">Member Login</a></li>
            </ul>
          </div>

          <div>
            <div className={styles.colTitle}>Offices</div>
            <p className={styles.contactLine}>
              Navi Mumbai — Sector 29, Parsik Hill Rd, CBD Belapur, Maharashtra 400614
            </p>
            <p className={styles.contactLine}>
              Ahmedabad — Siddhivinayak Business Tower, Makarba, Gujarat 380051
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Billennium Divas Fund. All rights reserved.</span>
          <span>Made for women who build the future.</span>
        </div>
      </div>
    </footer>
  );
}
