import type { Metadata } from 'next';
import TiltedGallery from '@/components/TiltedGallery';
import styles from './women-power.module.css';
import { createAdminClient } from '@/lib/supabase/server';

export const metadata: Metadata = { title: 'The Women Power – Billennium Divas' };

// Use ISR - regenerate page every 5 minutes
export const revalidate = 300;

// Fetch gallery images directly from Supabase
async function getGalleryImages() {
  try {
    const supabase = createAdminClient();
    
    // List all buckets to find Gallery bucket
    const { data: buckets } = await supabase.storage.listBuckets();
    const galleryBucket = buckets?.find(b => b.name.toLowerCase() === 'gallery');
    
    if (!galleryBucket) {
      console.error('Gallery bucket not found');
      return [];
    }
    
    // List files from Gallery bucket
    const { data: files, error } = await supabase
      .storage
      .from(galleryBucket.name)
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'asc' }
      });
    
    if (error) {
      console.error('Failed to fetch gallery images:', error);
      return [];
    }
    
    // Filter only image files
    const imageFiles = files?.filter(file => {
      const ext = file.name.toLowerCase();
      return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
             ext.endsWith('.png') || ext.endsWith('.gif') || 
             ext.endsWith('.webp');
    }) || [];
    
    // Get public URLs for all images
    const images = imageFiles.map(file => {
      const { data } = supabase
        .storage
        .from(galleryBucket.name)
        .getPublicUrl(file.name);
      
      return data.publicUrl;
    });
    
    return images;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}

const SPEAKERS = [
  'Industry Leaders', 'Investors', 'Women Entrepreneurs', 'Startup Founders',
  'Ecosystem Enablers', 'Policy Makers', 'Corporate Leaders', 'Mentors',
];

const PARTNERS = [
  'National Stock Exchange', 'Technology Partners', 'Knowledge Partners', 
  'Community Allies', 'Investor Networks', 'Media Partners',
];

const FEATURES = [
  { number: '35+', label: 'Expert Speakers' },
  { number: '40', label: 'Award Categories' },
  { number: '250+', label: 'Entrepreneurs' },
  { number: '10', label: 'Startup Pitches' },
];

export default async function WomenPowerPage() {
  const images = await getGalleryImages();

  return (
    <>
      {/* Gallery at the very top */}
      <section style={{ padding: 0, margin: 0 }}>
        <TiltedGallery images={images} />
      </section>

      {/* Hero content */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Women <span className={styles.gradientText}>Power</span> Summit
            </h1>
            <p className={styles.heroLead}>
              India's most prestigious platform celebrating women entrepreneurship excellence
            </p>
            <p className={styles.heroTagline}>
              #BreakFree · #BeThePower
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {FEATURES.map((stat, i) => (
              <div className={styles.statCard} key={i}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutContent}>
            <h2 className={styles.aboutTitle}>
              Championing Women. <span className={styles.gradientText}>Celebrating Excellence.</span>
            </h2>
            <p>
              The Women Power Summit & Awards is a highly process-driven recognition platform celebrating 
              business excellence across multiple award categories for women entrepreneurs and ecosystem enablers.
            </p>
            <p>
              Our mission is to understand and address challenges faced by women entrepreneurs while 
              celebrating excellence across MSMEs, startups, and ecosystem enablers through a rigorous, 
              fair recognition platform.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {/* <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏆</div>
              <h3>40 Award Categories</h3>
              <p>30 categories for women entrepreneurs & women-led startups, plus 10 open categories for ecosystem enablers</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎤</div>
              <h3>Expert Speakers & Panels</h3>
              <p>Fireside chats, panel discussions, and keynotes from industry leaders and successful entrepreneurs</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h3>PitchPower Sessions</h3>
              <p>Live pitch opportunities for startups to present to marquee investors and ecosystem partners</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤝</div>
              <h3>Power Networking</h3>
              <p>Connect with 250+ entrepreneurs, investors, mentors & ecosystem enablers</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Speakers */}
      {/* <section className={styles.speakersSection}>
        <div className="container">
          <h3 className={styles.sectionTitle}>Summit Participants</h3>
          <div className={styles.speakerGrid}>
            {SPEAKERS.map((s) => (
              <span className={styles.speakerName} key={s}>{s}</span>
            ))}
          </div>
        </div>
      </section> */}

      {/* Partners */}
      {/* <section className={styles.partnersSection}>
        <div className="container">
          <h3 className={styles.sectionTitle}>Partners & Ecosystem</h3>
          <p className={styles.partnersIntro}>
            Powered by a strong ecosystem of knowledge partners, investors, community allies, 
            and enablers who share Billennium Divas' mission of inclusive growth.
          </p>
          <div className={styles.partnerGrid}>
            {PARTNERS.map((p) => (
              <span className={styles.partnerName} key={p}>{p}</span>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Join the <span className={styles.gradientText}>Movement</span>
            </h2>
            <p className={styles.ctaSubtext}>
              Be part of India's premier platform for women entrepreneurship
            </p>
            <a href="/contact" className={styles.ctaButton}>
              Get in Touch
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
