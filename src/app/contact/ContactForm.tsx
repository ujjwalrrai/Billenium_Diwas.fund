'use client';

import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className={styles.formHead}>
        <div className={styles.formTitle}>Send us a message</div>
        <p className={styles.formNote}>We usually reply within 1–2 business days.</p>
      </div>

      <div className={styles.field}>
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" type="text" required placeholder="Your name" disabled={sent} />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required placeholder="you@company.com" disabled={sent} />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell us about your venture"
          disabled={sent}
        />
      </div>
      <button type="submit" className={styles.submit} disabled={sent}>
        {sent ? (
          <>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10.5 8 14.5 16 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Message Sent
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}