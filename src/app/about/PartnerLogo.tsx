'use client';

import { useState } from 'react';
import styles from './about.module.css';

export default function PartnerLogo({ name, src }: { name: string; src: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={styles.partnerPlaceholder}>
        <span>{name}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className={styles.partnerLogoImg}
      onError={() => setErrored(true)}
      loading="lazy"
    />
  );
}