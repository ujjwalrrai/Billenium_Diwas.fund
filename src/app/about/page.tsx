import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import MediaStrip from '@/components/MediaStrip';
import styles from './about.module.css';

export const metadata: Metadata = { title: 'About – Billennium Divas' };

const PARTNERS = ['SSIP Gujarat', 'AP Innovation Society', 'AICRAISE', 'EDI India', 'Craywingz', 'CMF Asia', 'CIMSME'];

const TEAM = [
  { name: 'Minal Kothari', role: 'Co-Founder & Director' },
  { name: 'Bhavesh Kothari', role: 'Co-Founder & Director' },
  { name: 'Pratik Lalani', role: 'Entrepreneur In Residence' },
  { name: 'Purvang Joshi', role: 'Entrepreneur In Residence' },
];

const ADVISORS = [
  { name: 'Shweta Shalini', role: 'Chief Evangelist, Executive Director – MVSTF (GoM)' },
  { name: 'Tapaswi Patel', role: 'CMD, Tapaswi Group' },
  { name: 'Nabomita Mazumdar', role: 'Principal Evangelist, Founder – Nabomita.com' },
  { name: 'Ms. Rajashri Rajashekhar', role: 'Principal Evangelist, Founder – Poornam Foundation' },
  { name: 'Rtn Alpa Shah', role: 'Principal Evangelist, Social Entrepreneur & Finance Expert' },
  { name: 'Shubhangi Mitra', role: 'Principal Evangelist – UK & Europe, Managing Partner – Solacexis' },
  { name: 'Aparna Mishra', role: 'Principal Evangelist, Founder – Women Shine' },
  { name: 'Ms. Shoma Mittra', role: 'Principal Evangelist – Australia, Director – WriteClickWriting' },
];

function initials(name: string) {
  const clean = name.replace(/^(Dr\.|Ms\.|Mr\.|Rtn)\s+/i, '');
  const parts = clean.split(' ').filter(Boolean);
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        title="Backing the women rewriting India's entrepreneurial future."
        lead="An early-stage micro-equity fund, sector agnostic, built for and by women."
      />

      <section className={styles.section}>
        <div className={`container ${styles.fundGrid}`}>
          <div>
            <span className={styles.sectionEyebrow}>The Fund</span>
            <h2 className={styles.fundTitle}>Capital follows conviction — ours follows women.</h2>
            <div className={styles.fundBody}>
              <p>
                Women-led enterprises experience more success and fewer
                failures compared to their male counterparts. Yet venture
                investment doesn&rsquo;t reflect this. Business Insider France
                reported that enterprises founded or co-founded by women
                receive roughly $935,000 in investment on average, against
                about $2.1 million for those founded by men — even as
                women-founded startups generate more per dollar raised.
              </p>
              <p>
                Billennium Divas Fund was formed to change that. It&rsquo;s an
                early-stage micro-equity fund investing in the exponential
                power of exceptionally talented women entrepreneurs — sector
                agnostic, for and by women.
              </p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statBig}>78¢</div>
            <p>generated per dollar raised by women-founded startups, versus 31¢ for their male counterparts.</p>
            <div className={styles.statDivider} />
            <div className={styles.figRow}>
              <span>Avg. funding — women founders</span>
              <span>$935K</span>
            </div>
            <div className={styles.figRow}>
              <span>Avg. funding — male founders</span>
              <span>$2.1M</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className="container">
          <span className={styles.sectionEyebrow}>Partners</span>
          <div className={styles.logoRow}>
            {PARTNERS.map((p) => (
              <span className={styles.logoPill} key={p}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.fundGrid}`}>
          <div>
            <span className={styles.sectionEyebrow}>The Future</span>
            <h2 className={styles.fundTitle}>114% more women entrepreneurs than 20 years ago.</h2>
            <div className={styles.fundBody}>
              <p>
                Yet Indian statistics tell a fuller story. Per the Sixth
                Economic Census, women constitute around 14% of total
                entrepreneurship — 8.05 million of 58.5 million entrepreneurs.
                2.76 million work in agriculture; 5.29 million in
                non-agriculture. Average employment in women-owned
                enterprises remains a modest 1.67.
              </p>
              <p>
                For Billennium Divas, the mission is to change these numbers
                as much as we possibly can. There are miles to go before we
                sleep.
              </p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statBig}>14%</div>
            <p>of India&rsquo;s entrepreneurs are women — 8.05M out of 58.5M, per the Sixth Economic Census.</p>
            <div className={styles.statDivider} />
            <div className={styles.figRow}>
              <span>Agriculture sector</span>
              <span>2.76M</span>
            </div>
            <div className={styles.figRow}>
              <span>Non-agriculture sector</span>
              <span>5.29M</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.alt}`}>
        <div className="container">
          <span className={styles.sectionEyebrow}>The Team</span>
          <div className={styles.peopleGrid}>
            {TEAM.map((p) => (
              <div className={styles.personCard} key={p.name}>
                <div className={styles.personAvatar}>{initials(p.name)}</div>
                <div className={styles.personName}>{p.name}</div>
                <div className={styles.personRole}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <span className={styles.sectionEyebrow}>Advisors</span>
          <div className={styles.peopleGrid}>
            {ADVISORS.map((p) => (
              <div className={styles.personCard} key={p.name}>
                <div className={styles.personAvatar}>{initials(p.name)}</div>
                <div className={styles.personName}>{p.name}</div>
                <div className={styles.personRole}>{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />

      <section className={styles.section}>
        <div className="container">
          <span className={styles.sectionEyebrow}>The Initiatives &amp; Events</span>
          <div className={styles.twoCol}>
            <div className={styles.initCard}>
              <h3>WEFORME</h3>
              <p>
                An initiative for equipping ex-corporate urban married women
                with the skills, confidence and support they need to incept
                and install a business of their own — turning ideas into
                possibilities of a successful future.
              </p>
            </div>
            <div className={styles.initCard}>
              <h3>Project HOPE</h3>
              <p>
                An initiative for rural women, inspiring them to engage and
                endeavor in entrepreneurship, backed by a seed fund from
                Billennium Divas.
              </p>
            </div>
          </div>
          <div className={styles.eventPills}>
            <span className={styles.eventPill}>Women Power</span>
            <span className={styles.eventPill}>Women Startup Investors Summit (W-S.I.S)</span>
            <span className={styles.eventPill}>Diva Entrepreneurs Bootcamp (DEBOOT)</span>
          </div>
        </div>
      </section>

      <MediaStrip />
    </>
  );
}
