'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, MouseEvent } from 'react';
import styles from './page.module.css';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import MediaStrip from '@/components/MediaStrip';

const FOCUS_AREAS = [
  {
    title: 'Tech & SaaS',
    desc: 'Software platforms solving real-world problems at scale.',
    image: '/images/focus-saas1.png'
  },
  {
    title: 'D2C & E-Commerce',  
    desc: 'Direct-to-consumer brands disrupting traditional retail.',
    image: '/images/focus-ecommerce.png'
  },
  {
    title: 'Impact & Sustainability',
    desc: 'Mission-driven ventures creating positive change.',
    image: '/images/focus-impact.png'
  },
  {
    title: 'HealthTech & EdTech',
    desc: 'Innovation in healthcare and education delivery.',
    image: '/images/focus-health.png'
  },
];

// Google Form URL for applications
const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || 'https://forms.google.com/';

export default function Home() {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const handleHeroBackgroundMove = (e: MouseEvent<HTMLDivElement>) => {
    const hero = e.currentTarget;
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find the heroBackground element and update its CSS variables
    const background = hero.querySelector(`.${styles.heroBackground}`) as HTMLElement;
    if (background) {
      background.style.setProperty('--mouse-x', `${x}px`);
      background.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} onMouseMove={handleHeroBackgroundMove}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
          <div className={styles.gridPattern}></div>
        </div>

        <div className="container">
          <div className={styles.heroLayout}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge} data-aos="fade-down">
                <span className={styles.badgePulse}></span>
                Now Accepting Applications for 2026
              </div>

              <h1 className={styles.heroTitle} data-aos="fade-up" data-aos-delay="100">
                Where <span className={styles.gradientPink}>Women-Led</span> Ideas Transform Into{' '}
                <span className={styles.gradientGold}>Billion-Dollar</span>{' '}
                <span className={styles.gradientPurple}>Enterprises</span>
              </h1>

              <p className={styles.heroSubtitle} data-aos="fade-up" data-aos-delay="200">
                We don't just fund startups. We build ecosystems. Billennium Divas Fund combines
                capital, mentorship, and network access to help women entrepreneurs scale faster,
                grow smarter, and win bigger.
              </p>

              <div className={styles.heroActions} data-aos="fade-up" data-aos-delay="300">
                <a
                  href={GOOGLE_FORM_URL}
                  className={styles.btnPrimary}
                  onMouseMove={handleMouseMove}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Apply for Funding</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <Link
                  href="/about"
                  className={styles.btnGlass}
                  onMouseMove={handleMouseMove}
                >
                  <span>How We Invest</span>
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual} data-aos="fade-left" data-aos-delay="200">
              <div className={styles.heroImageWrapper}>
                <Image
                  src="/images/BD_group.png"
                  alt="Billennium Divas Fund Event - Women Entrepreneurs"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 200vw, 45vw"
                  className={styles.heroImage}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section - Diagonal Split Layout */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoBg}></div>
        <div className="container">
          <div className={styles.manifestoLayout}>
            <div className={styles.manifestoLeft} data-aos="fade-right">
              <span className={styles.sectionLabel}>Our Manifesto</span>
              <h2 className={styles.manifestoTitle}>
                A <span className={styles.gradientText}>Billion</span> Millenniums.
                <br />
                One <span className={styles.gradientText}>Unstoppable</span> Movement.
              </h2>
            </div>

            <div className={styles.manifestoRight}>
              <div className={styles.glassCard} data-aos="fade-left" data-aos-delay="100">
                <p className={styles.manifestoPara}>
                  Despite countless initiatives and programs, the entrepreneurial ecosystem
                  for women remains fractured. Mentorship programs without capital. Capital
                  without networks. Networks without strategic guidance.
                </p>
                <p className={styles.manifestoPara}>
                  <strong>Billennium Divas changes that.</strong> We're not another fund that
                  writes checks and disappears. We're an integrated platform that aligns
                  everything a woman founder needs to not just survive, but <em className={styles.highlightText}>thrive</em>—and
                  delivers it cohesively, at every stage.
                </p>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {/* Investment Focus - Bento Grid Layout */}
      <section className={styles.focus}>
        <div className="container">
          <div className={styles.focusHeader} data-aos="fade-up">
            <span className={styles.sectionLabel}>Investment Thesis</span>
            <h2 className={styles.focusTitle}>
              We back <span className={styles.gradientText}>women building</span> the next generation
              <br />
              of <span className={styles.gradientText}>category-defining</span> companies
            </h2>
          </div>

          <div className={styles.bentoGrid}>
            {FOCUS_AREAS.map((area, index) => (
              <div
                key={area.title}
                className={`${styles.bentoCard} ${styles[`bento${index + 1}`]}`}
                data-aos="zoom-in"
                data-aos-delay={100 + (index * 100)}
                onMouseMove={handleMouseMove}
              >
                <div className={styles.cardImage}>
                  <Image
                    src={area.image}
                    alt={area.title}
                    width={400}
                    height={300}
                    className={styles.focusImage}
                  />
                  <div className={styles.imageOverlay}></div>
                </div>
                <div className={styles.cardGlassContent}>
                  <h3 className={styles.cardHeading}>{area.title}</h3>
                  <p className={styles.cardDesc}>{area.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.focusCta} data-aos="fade-up" data-aos-delay="500">
            <div className={styles.ctaGlass}>
              <div className={styles.ctaContent}>
                <h3 className={styles.ctaHeading}>
                  Ready to <span className={styles.gradientText}>raise capital</span>?
                </h3>
                <p className={styles.ctaSubtext}>
                  We invest at the early stage with ticket sizes from ₹25L to ₹5Cr
                </p>
              </div>
              <a
                href={GOOGLE_FORM_URL}
                className={styles.btnPrimary}
                onMouseMove={handleMouseMove}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Submit Your Pitch</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Cards Layout */}
      <section className={styles.team}>
        <div className="container">
          <div className={styles.teamHeader} data-aos="fade-up">
            <span className={styles.sectionLabel}>The Founding Team</span>
            <h2 className={styles.teamTitle}>
              Built by <span className={styles.gradientText}>entrepreneurs</span>,
              <br />
              for <span className={styles.gradientText}>entrepreneurs</span>
            </h2>
          </div>

          <div className={styles.teamGrid}>
            <div className={styles.teamCards} data-aos="fade-right">
              <div className={styles.memberCard}>
                <div className={styles.memberName}>Bhavesh Kothari</div>
                <div className={styles.memberRole}>Founder & Director</div>
              </div>
              <div className={styles.memberCard}>
                <div className={styles.memberName}>Minal Kothari</div>
                <div className={styles.memberRole}>Co-Founder & Director</div>
              </div>
              <div className={styles.memberCard}>
                <div className={styles.memberName}>Pratik Lalani</div>
                <div className={styles.memberRole}>Entrepreneur In Residence</div>
              </div>
              <div className={styles.memberCard}>
                <div className={styles.memberName}>Purvang Joshi</div>
                <div className={styles.memberRole}>Entrepreneur In Residence</div>
              </div>
            </div>

            <div className={styles.teamVisual} data-aos="fade-left" data-aos-delay="200">
              <Image
                src="/images/team-event.png"
                alt="Billennium Divas founding team"
                width={600}
                height={700}
                className={styles.teamImage}
              />
            </div>
          </div>

        </div>
      </section>

      <Stats />
      <Testimonials />
      <MediaStrip />
    </>
  );
}