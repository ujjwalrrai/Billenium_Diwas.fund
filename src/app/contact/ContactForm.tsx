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
      <div className={styles.field}>
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" type="text" required placeholder="Your name" />
      </div>
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required placeholder="you@company.com" />
      </div>
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} required placeholder="Tell us about your venture" />
      </div>
      <button type="submit" className={styles.submit}>
        {sent ? 'Message Sent ✓' : 'Send Message'}
      </button>
    </form>
  );
}
