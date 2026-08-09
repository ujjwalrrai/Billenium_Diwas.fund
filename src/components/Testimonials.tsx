import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  {
    name: 'Dr. Molishree IES',
    role: 'Niti Aayog',
    quote:
      '"Billennium Divas is doing something India desperately needed — building real infrastructure around women-led ambition, not just applauding it."',
  },
  {
    name: 'Dr. Tejal Kanwar',
    role: 'Founder, Kleinetics Kids Fitness',
    quote:
      '"The mentoring engagement gave my business a structure I didn\'t know I was missing. It changed how I make decisions."',
  },
  {
    name: 'Ms. Almas Shafiuddin',
    role: 'Entrepreneur & Change Maker',
    quote:
      '"This isn\'t a fund that writes a cheque and disappears. The network and the follow-through are what set it apart."',
  },
  {
    name: 'Riddhi Doshi Patel',
    role: 'Founder Director, Rhyns Academy',
    quote:
      '"Being part of Women Power connected me to a community of founders who genuinely push each other forward."',
  },
  {
    name: 'Dr. Bhavi Mody',
    role: 'Founder, Vrudhi Holistic Health Care',
    quote:
      '"From pitch deck to first cheque, the team stayed hands-on. That kind of access is rare for early-stage founders."',
  },
  {
    name: 'Venkatesh Iyengar',
    role: 'Founder & CEO, Tathwamasi Inc.',
    quote:
      '"What impressed me most is the sector-agnostic lens — they evaluate founders on grit and clarity, not just category trends."',
  },
  {
    name: 'Aparna Mishra',
    role: 'Founder & CEO, Club Cafebiz',
    quote:
      '"The advisor bench alone is worth the partnership. Every intro they made moved my business forward."',
  },
  {
    name: 'Ms. Janhavi Yadwad',
    role: 'Entrepreneur & Business Excellence Expert',
    quote:
      '"Billennium Divas treats women entrepreneurship as an ecosystem to be built, not a box to be checked."',
  },
];

function initials(name: string) {
  const clean = name.replace(/^(Dr\.|Ms\.|Mr\.|Rtn)\s+/i, '');
  const parts = clean.split(' ').filter(Boolean);
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '');
}

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <span className={styles.eyebrow}>In Their Words</span>
          <h2 className={styles.title}>Testimonials</h2>
        </div>
      </div>
      
      {/* Infinite Scrolling Container */}
      <div className={styles.scrollContainer}>
        <div className={styles.scrollTrack}>
          {/* First set of testimonials */}
          {TESTIMONIALS.map((t, index) => (
            <div className={styles.card} key={`${t.name}-1-${index}`}>
              <div className={styles.quoteMark} aria-hidden="true">"</div>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.person}>
                <div className={styles.avatar}>{initials(t.name)}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {TESTIMONIALS.map((t, index) => (
            <div className={styles.card} key={`${t.name}-2-${index}`}>
              <div className={styles.quoteMark} aria-hidden="true">"</div>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.person}>
                <div className={styles.avatar}>{initials(t.name)}</div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
