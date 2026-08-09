import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from './ContactForm';
import styles from './contact.module.css';

export const metadata: Metadata = { title: 'Contact – Billennium Divas' };

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title="Let's talk about what you're building."
        lead="Reach our team directly, or find us at our Navi Mumbai and Ahmedabad offices."
      />

      <section className={styles.section}>
        <div className={`container ${styles.grid}`}>
          <div>
            <span className={styles.sectionEyebrow}>Our Offices</span>
            <h2 className={styles.title}>Two cities, one mission.</h2>

            <div className={styles.officeCard}>
              <div className={styles.officeCity}>Navi Mumbai</div>
              <p className={styles.officeAddr}>
                Plot no 37, Sector 29, Parsik Hill Rd, Sector 26,
                <br />
                CBD Belapur, Navi Mumbai, Maharashtra – 400614
              </p>
            </div>

            <div className={styles.officeCard}>
              <div className={styles.officeCity}>Ahmedabad</div>
              <p className={styles.officeAddr}>
                C-326 Siddhivinayak Business Tower, Kataria Automobiles Rd,
                <br />
                Makarba, Ahmedabad, Gujarat – 380051
              </p>
            </div>

            <div className={styles.contactList}>
              <div className={styles.contactRow}>
                <span>General inquiries</span>
                <span>info@billenniumdivas.fund</span>
              </div>
              <div className={styles.contactRow}>
                <span>Pitch decks</span>
                <span>pitch@billenniumdivas.fund</span>
              </div>
              <div className={styles.contactRow}>
                <span>Mentor relations — Bhavesh Kothari</span>
                <span>bhavesh.kothari@billenniumdivas.fund</span>
              </div>
              <div className={styles.contactRow}>
                <span>Investor relations — Pratik Lalani</span>
                <span>pratik.lalani@billenniumdivas.fund</span>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
