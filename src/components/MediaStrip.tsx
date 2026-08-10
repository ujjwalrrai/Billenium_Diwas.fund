import Image from 'next/image';
import styles from './MediaStrip.module.css';

const OUTLETS = [
  { name: 'Inc42', logo: '/images/media/inc42.png' },
  { name: 'Free Press Journal', logo: '/images/media/free-press-journal.png' },
  { name: 'BW Disrupt', logo: '/images/media/bw-disrupt.png' },
  { name: 'Economic Times', logo: '/images/media/economic-times.png' },
  { name: 'Vyapaar Jagat', logo: '/images/media/vyapaar-jagat.png' },
  { name: 'The Fearless Indian', logo: '/images/media/the-fearless-indian.png' }
];

export default function MediaStrip() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>Featured In Media</div>
        <div className={styles.row}>
          {OUTLETS.map((outlet) => (
            <a key={outlet.name} href="#" className={styles.brand}>
              <div className={styles.logoWrapper}>
                <Image
                  src={outlet.logo}
                  alt={`${outlet.name} logo`}
                  width={200}
                  height={80}
                  className={styles.logo}
                />
              </div>
              <span className={styles.brandName}>{outlet.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
