import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import MediaStrip from '@/components/MediaStrip';
import PartnerLogo from './PartnerLogo';
import styles from './about.module.css';

export const metadata: Metadata = { title: 'About – Billennium Divas' };

// Google Form URL for applications
const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || 'https://forms.google.com/';

const MILESTONES = [
  {
    year: '2017',
    text:
      'Founded at the Global Entrepreneurship Summit by Minal Kothari, Bhavesh Kothari and Tapaswi Patel — launched by Shweta Shalini, Shilpa Shetty Kundra and Vishakha Singh.',
  },
  {
    year: 'Today',
    text: 'Recognized as the second women-only venture capital fund in India.',
  },
  {
    year: '₹25L–₹5Cr',
    text: 'Our typical ticket size for early-stage, sector-agnostic investments.',
  },
];

const WHERE_WE_INVEST = [
  'B2B & B2C Marketplace',
  'E-Commerce & Tech',
  'Web-Enabled Services',
  'Platform & Communities',
];

const BOARD = [
  { name: 'Ms. Minal Kothari', role: 'Co-Founder & Director', image: '/images/board/minal-kothari.jpg' },
  { name: 'Mr. Bhavesh Kothari', role: 'Co-Founder & Director', image: '/images/board/bhavesh-kothari.jpg' },
];

const ADVISORS = [
  { name: 'Shweta Shalini', image: '/images/advisors/shweta-shalini.jpg' },
  { name: 'Tapaswi Patel', image: '/images/advisors/tapaswi-patel.jpg' },
  { name: 'Adhiraj Banerjee', image: '/images/advisors/adhiraj-banerjee.jpg' },
  { name: 'Amit Singal', image: '/images/advisors/amit-singal.jpg' },
  { name: 'Rajashri', image: '/images/advisors/rajashri.jpg' },
  { name: 'Shubhangi Mitra', image: '/images/advisors/shubhangi-mitra.jpg' },
  { name: 'Ajay Thakur', image: '/images/advisors/ajay-thakur.jpg' },
];

const PARTNERS = [
  { name: 'SSIP Gujarat', logo: '/images/partners/ssip.png' },
  { name: 'AP Innovation Society', logo: '/images/partners/ap-innovation.png' },
  { name: 'AIC RAISE', logo: '/images/partners/aic-raise.png' },
  { name: 'EDI India', logo: '/images/partners/edi-india.png' },
  { name: 'Craywingz', logo: '/images/partners/craywingz.png' },
  { name: 'CMF Asia', logo: '/images/partners/cmf-asia.png' },
  { name: 'CIMSME', logo: '/images/partners/cimsme.png' },
];

const INITIATIVES = [
  {
    title: 'WEFORME',
    desc: 'Equipping ex-corporate, urban married women with the skills, confidence and support to build a business of their own.',
  },
  {
    title: 'Project HOPE',
    desc: 'Inspiring rural women toward entrepreneurship, backed by a seed fund from Billennium Divas.',
  },
];

const EVENTS = ['Women Power', 'W-S.I.S', 'DEBOOT'];

export default function AboutPage() {
  return (
    <>
      {/* ─── THE FUND ─── */}
      <section className={`${styles.section} ${styles.firstSection}`}>
        <div className="container">
          <div className={styles.fundGrid}>
            <div data-aos="fade-up">
              <span className={styles.eyebrow}>The Fund</span>
              <h2 className={styles.fundTitle}>
                Capital follows conviction —{' '}
                <span className={styles.gradientPink}>ours follows women.</span>
              </h2>
              <p className={styles.fundLead}>
                Women-led enterprises succeed more often and fail less — yet venture capital
                doesn&apos;t reflect it. Billennium Divas exists to close that gap.
              </p>
              <p className={styles.fundBody}>
                We&apos;re an early-stage micro-equity fund investing in the exponential
                potential of exceptionally talented women entrepreneurs — sector-agnostic,
                and built for and by women.
              </p>

              <a href={GOOGLE_FORM_URL} className={styles.btnPrimary}>
                Submit a Pitch Deck
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MILESTONES / OUR STORY ─── */}
<section className={styles.sectionAlt}>
  <div className="container">
    <div className={styles.storySection}>
      <div className={styles.sectionHeader} data-aos="fade-up">
        <span className={styles.eyebrow}>Our Story</span>
        <h2 className={styles.sectionTitle}>Six years of building.</h2>
      </div>

      <div className={styles.storyPhoto} data-aos="fade-up" data-aos-delay="150">
        <div
          className={styles.storyPhotoImg}
          style={{ backgroundImage: 'url(/images/BD_launch.png), linear-gradient(135deg, #ec4899, #a855f7)' }}
          role="img"
          aria-label="Billennium Divas team"
        />
      </div>

      <div className={styles.timeline} data-aos="fade-up">
        {MILESTONES.map((m) => (
          <div className={styles.timelineItem} key={m.year}>
            <div className={styles.timelineMarker}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineLine} />
            </div>
            <div>
              <div className={styles.timelineYear}>{m.year}</div>
              <p className={styles.timelineText}>{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* ─── MANIFESTO (the one full-bleed dramatic moment) ─── */}
      <section className={styles.manifestoSection}>
        <div className={styles.manifestoBg} aria-hidden="true" />
        <div className={styles.manifestoOrb} aria-hidden="true" />
        <div className="container">
          <div className={styles.manifestoInner} data-aos="fade-up">
            <span className={styles.eyebrowLight}>The Rationale</span>
            <h2 className={styles.manifestoTitle}>
              A Billion Millenniums.<br />
              <span className={styles.gradientGold}>One Unstoppable Mission.</span>
            </h2>
            <p className={styles.manifestoText}>
              Billennium Divas is more than a venture fund — it&apos;s a mission for the women
              entrepreneurs defining the future on their own terms. An umbrella of capital,
              mentorship and community, built to grow for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WHERE WE INVEST ─── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader} data-aos="fade-up">
            <span className={styles.eyebrow}>Where We Invest</span>
            <h2 className={styles.sectionTitle}>
              Focused on sectors where{' '}
              <span className={styles.gradientPink}>women-led startups</span> create outsized
              impact
            </h2>
          </div>
          <div className={styles.investList}>
            {WHERE_WE_INVEST.map((label, i) => (
              <div className={styles.investItem} key={label} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className={styles.investNum}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.investLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOARD OF DIRECTORS ─── */}
      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader} data-aos="fade-up">
            <span className={styles.eyebrow}>Leadership</span>
            <h2 className={styles.sectionTitle}>Board of Directors</h2>
          </div>
          <div className={styles.boardGrid}>
            {BOARD.map((p, i) => (
              <div className={styles.boardCard} key={p.name} data-aos="fade-up" data-aos-delay={i * 100}>
                <div
                  className={styles.photoPortrait}
                  style={{ backgroundImage: `url(${p.image}), linear-gradient(135deg, #ec4899, #a855f7)` }}
                  role="img"
                  aria-label={p.name}
                />
                <div className={styles.boardName}>{p.name}</div>
                <div className={styles.boardRole}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ADVISORY BOARD ─── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader} data-aos="fade-up">
            <span className={styles.eyebrow}>Advisory Board</span>
            <h2 className={styles.sectionTitle}>Guided by leaders who share our conviction.</h2>
          </div>
          <div className={styles.advisoryGrid}>
            {ADVISORS.map((p, i) => (
              <div className={styles.advisorCard} key={p.name} data-aos="fade-up" data-aos-delay={i * 60}>
                <div
                  className={styles.photoCircle}
                  style={{ backgroundImage: `url(${p.image}), linear-gradient(135deg, #ec4899, #a855f7)` }}
                  role="img"
                  aria-label={p.name}
                />
                <div className={styles.advisorName}>{p.name}</div>
                <div className={styles.advisorTag}>Advisory Board Member</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNERS ─── */}
      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader} data-aos="fade-up">
            <span className={styles.eyebrow}>Partners</span>
            <h2 className={styles.sectionTitle}>
              Backed by <span className={styles.gradientPink}>trusted institutions</span>
            </h2>
          </div>

          <div className={styles.partnersGrid}>
            {PARTNERS.map((p, i) => (
              <div
                className={styles.partnerItem}
                key={p.name}
                data-aos="fade-up"
                data-aos-delay={i * 70}
              >
                <PartnerLogo name={p.name} src={p.logo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INITIATIVES & EVENTS ─── */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader} data-aos="fade-up">
            <span className={styles.eyebrow}>The Initiatives &amp; Events</span>
            <h2 className={styles.sectionTitle}>
              Programs that <span className={styles.gradientPink}>move the needle</span>
            </h2>
          </div>

          <div className={styles.initiativeGrid}>
            {INITIATIVES.map((item, i) => (
              <div className={styles.initiativeCard} key={item.title} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className={styles.initiativeNum}>{String(i + 1).padStart(2, '0')}</div>
                <div className={styles.initiativeBadge}>Initiative</div>
                <h3 className={styles.initiativeTitle}>{item.title}</h3>
                <p className={styles.initiativeDesc}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.eventsBand} data-aos="fade-up">
            <div className={styles.eventsBandLeft}>
              <span className={styles.eyebrow}>Signature Events</span>
              <p className={styles.eventsSubtext}>
                Conceptualized and conducted year-on-year by Team Billennium Divas
              </p>
            </div>
            <div className={styles.eventPills}>
              {EVENTS.map((e) => (
                <span className={styles.eventPill} key={e}>{e}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaOrb1}></div>
        <div className={styles.ctaOrb2}></div>
        <div className="container">
          <div className={styles.ctaInner}>
            <span className={styles.eyebrowLight}>Ready to grow?</span>
            <h2 className={styles.ctaTitle}>
              Apply for funding or nominate a{' '}
              <span className={styles.gradientGold}>deserving founder</span>
            </h2>
            <div className={styles.ctaActions}>
              <a href="mailto:pitch@billenniumdivas.fund" className={styles.btnPrimary}>
                Submit Pitch Deck
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://event.billenniumdivas.fund/" className={styles.btnGlass}>
                Nominate Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <MediaStrip />
    </>
  );
}