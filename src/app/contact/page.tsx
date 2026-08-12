import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from './ContactForm';
import styles from './contact.module.css';

export const metadata: Metadata = { title: 'Contact – Billennium Divas' };

const OFFICES = [
  {
    city: 'Navi Mumbai',
    lines: [
      'Plot no 37, Sector 29, Parsik Hill Rd, Sector 26,',
      'CBD Belapur, Navi Mumbai, Maharashtra – 400614',
    ],
  },
  {
    city: 'Ahmedabad',
    lines: [
      'C-326 Siddhivinayak Business Tower, Kataria Automobiles Rd,',
      'Makarba, Ahmedabad, Gujarat – 380051',
    ],
  },
];

const CONTACTS = [
  { label: 'General inquiries', email: 'info@billenniumdivas.fund' },
  { label: 'Pitch decks', email: 'pitch@billenniumdivas.fund' },
  { label: 'Mentor relations — Bhavesh Kothari', email: 'bhavesh.kothari@billenniumdivas.fund' },
  { label: 'Investor relations — Pratik Lalani', email: 'pratik.lalani@billenniumdivas.fund' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        title="Let's talk about what you're building."
        lead="Reach our team directly, or find us at our Navi Mumbai and Ahmedabad offices."
      />

      <section className={styles.section}>
        <div className={styles.sectionBg} aria-hidden="true" />

        <div className={`container ${styles.grid}`}>
          <div className={styles.infoCol}>
            <span className={styles.sectionEyebrow}>Our Offices</span>
            <h2 className={styles.title}>Two cities, one mission.</h2>

            {OFFICES.map((office) => (
              <div className={styles.officeCard} key={office.city}>
                <div className={styles.officeHead}>
                  <span className={styles.pinIcon} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 18s6-5.2 6-9.6A6 6 0 1 0 4 8.4C4 12.8 10 18 10 18Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <circle cx="10" cy="8.4" r="2.1" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                  <div className={styles.officeCity}>{office.city}</div>
                </div>
                <p className={styles.officeAddr}>
                  {office.lines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < office.lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            ))}

            <div className={styles.contactList}>
              {CONTACTS.map((c) => (
                <a key={c.email} href={`mailto:${c.email}`} className={styles.contactRow}>
                  <span className={styles.contactLabel}>
                    <span className={styles.mailIcon} aria-hidden="true">
                      <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                        <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M3.5 5.5 10 11l6.5-5.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {c.label}
                  </span>
                  <span className={styles.contactEmail}>{c.email}</span>
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}