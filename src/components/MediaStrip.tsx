import styles from './MediaStrip.module.css';

const OUTLETS = ['Inc42', 'Free Press Journal', 'BW Disrupt', 'Economic Times', 'Vyapaar Jagat', 'The Fearless Indian'];

export default function MediaStrip() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>Featured In Media</div>
        <div className={styles.row}>
          {OUTLETS.map((o) => (
            <a key={o} href="#" className={styles.brand}>
              {o}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
