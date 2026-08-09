import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import styles from './women-power.module.css';

export const metadata: Metadata = { title: 'The Women Power – Billennium Divas' };

const SPEAKERS = [
  'Shweta Shalini', 'Anju Sharma IAS', 'Moli Shree IES', 'Sulajja Firodia Motwani',
  'Usha Kakade', 'Revathy Roy', 'Fatema Agarkar', 'Nabomita Mazumdar',
  'Apoorva Palkar', 'Shanta Vallury Gandhi',
];

const PARTNERS = [
  'Government of Gujarat', 'Bombay Stock Exchange', 'IIT Mumbai', 'CNBC Young Turks',
  'National Stock Exchange', 'Savitribai Phule Pune University', 'TiE', 'FICCI',
  'Kotak Mahindra Bank', 'Bank of Baroda', 'Vertices Partners',
];

const EDITIONS = [
  { year: '2016', city: 'Mumbai' },
  { year: '2017', city: 'Mumbai' },
  { year: '2019', city: 'Mumbai' },
  { year: '2019', city: 'Ahmedabad' },
  { year: '2019', city: 'Pune' },
];

export default function WomenPowerPage() {
  return (
    <>
      <PageHero
        crumb="Women Power"
        title="A stage for the women who defied the odds."
        lead="Launched in 2016, Women Power has become a signature knowledge-sharing platform in India's women startup and entrepreneurial ecosystem."
      />

      <section className={styles.section}>
        <div className={`container ${styles.introGrid}`}>
          <div>
            <span className={styles.sectionEyebrow}>The Women Power</span>
            <h2 className={styles.introTitle}>Five editions. One growing movement.</h2>
            <div className={styles.introBody}>
              <p>
                &lsquo;Women Power&rsquo; is an inspiring knowledge-sharing
                platform created for women who have defied the odds and
                emerged into the world of entrepreneurship. It&rsquo;s the
                brainchild of Bhavesh Kothari — a startup mentor, business
                advisor and entrepreneur who has been a driving force in
                India&rsquo;s startup industry for over a decade.
              </p>
              <p>
                It has evolved to become the most sought-after platform for
                women entrepreneurs to get educated, express ideas and
                explore growth opportunities in collaboration with marquee
                institutions.
              </p>
            </div>
          </div>
          <div className={styles.mediaCard}>
            <span className={styles.mediaCardLabel}>Power, Unleashed on stage.</span>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className="container">
          <span className={styles.sectionEyebrow}>Featured Speakers</span>
          <div className={styles.speakerRow}>
            {SPEAKERS.map((s) => (
              <span className={styles.speakerPill} key={s}>{s}</span>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <span className={styles.sectionEyebrow}>In Collaboration With</span>
            <div className={styles.partnerRow}>
              {PARTNERS.map((p) => (
                <span className={styles.partnerPill} key={p}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <span className={styles.sectionEyebrow}>The Gallery</span>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>Govt. of Gujarat MoU</div>
            <div className={styles.galleryItem}>Women Power, Mumbai</div>
            <div className={styles.galleryItem}>Women Power, Pune 2019</div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className="container">
          <span className={styles.sectionEyebrow}>Editions So Far</span>
          <div className={styles.editionRow} style={{ color: 'var(--plum)' }}>
            {EDITIONS.map((e, i) => (
              <div className={styles.editionCol} key={i}>
                <span className={styles.editionYear} style={{ color: 'var(--berry)' }}>{e.year}</span>
                <span className={styles.editionCity} style={{ color: 'rgba(26,20,32,0.55)' }}>{e.city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.ctaBand}>
            <h2>Like what you see?</h2>
            <a href="/contact" className={styles.btnPrimary}>Get in Touch</a>
          </div>
        </div>
      </section>
    </>
  );
}
