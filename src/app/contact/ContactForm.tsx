'use client';

import { useState, FormEvent } from 'react';
import styles from './contact.module.css';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSent(true);
      // Reset form
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHead}>
        <div className={styles.formTitle}>Send us a message</div>
        <p className={styles.formNote}>We usually reply within 1–2 business days.</p>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {sent && (
        <div className={styles.successMessage}>
          ✓ Message sent successfully! We'll get back to you soon.
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="name">Full name</label>
        <input 
          id="name" 
          name="name" 
          type="text" 
          required 
          placeholder="Your name" 
          disabled={loading || sent}
          minLength={2}
          maxLength={100}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          placeholder="you@company.com" 
          disabled={loading || sent}
          maxLength={100}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell us about your venture"
          disabled={loading || sent}
          minLength={10}
          maxLength={1000}
        />
      </div>

      <button 
        type="submit" 
        className={styles.submit} 
        disabled={loading || sent}
      >
        {loading ? (
          <>
            <span className={styles.spinner}></span>
            Sending...
          </>
        ) : sent ? (
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

      {sent && (
        <button
          type="button"
          className={styles.sendAnother}
          onClick={() => setSent(false)}
        >
          Send another message
        </button>
      )}
    </form>
  );
}
