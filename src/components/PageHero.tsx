import styles from './PageHero.module.css';

export default function PageHero({
  crumb,
  title,
  lead,
}: {
  crumb: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className={styles.hero}>
      <span className={styles.watermark} aria-hidden="true">B</span>
      <div className="container">
        <div className={styles.crumb}>
          Billennium Divas / <span>{crumb}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
    </section>
  );
}
