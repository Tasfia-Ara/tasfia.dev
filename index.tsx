import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Crown,
  FileText,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from 'lucide-react';
import './styles.css';

const HERO_WORDS = ['systems', 'models', 'communities'];

type GitHubContribution = {
  date: string;
  count: number;
  level: number;
};

type ActivityDay = GitHubContribution & {
  isFuture: boolean;
};

const GITHUB_ACTIVITY_URL = 'https://github-contributions-api.jogruber.de/v4/Tasfia-Ara?y=last';
const ACTIVITY_WEEKS = 52;
const ACTIVITY_DAYS = 7;
const LANGUAGES = [
  'Python',
  'Java',
  'JavaScript',
  'TypeScript',
  'Kotlin',
  'Swift',
  'Ruby',
  'SQL',
  'C',
  'C++',
  'Verilog',
  'Solidity',
  'HTML',
  'CSS/SCSS',
  'Shell/Bash',
];
const SYSTEMS = [
  'Distributed systems',
  'ML infrastructure',
  'Data + ETL pipelines',
  'Ranking + retrieval',
  'Recommender systems',
  'Prediction systems',
  'Real-time processing',
  'Systems software',
  'Accelerated computing',
  'Performance engineering',
];
const RESPIRA_GALLERY = [
  {
    src: '/tasfia.dev/projects/respiracheck/team.jpg',
    alt: 'Tasfia and her RespiraCheck teammates presenting at CUCAI 2025',
    caption: 'The RespiraCheck team · CUCAI 2025',
  },
  {
    src: '/tasfia.dev/projects/respiracheck/poster.jpg',
    alt: 'RespiraCheck research poster presented at CUCAI 2025',
    caption: 'Our research poster',
  },
  {
    src: '/tasfia.dev/projects/respiracheck/cucai-2025.jpg',
    alt: 'I attended CUCAI 2025 conference graphic',
    caption: 'Canadian Undergraduate Conference in AI · 2025',
  },
];
const PERSONAL_PHOTOS = [
  {
    src: '/tasfia.dev/about/hike.jpeg',
    alt: 'Tasfia smiling during an autumn hike',
  },
  {
    src: '/tasfia.dev/about/food.jpeg',
    alt: 'A favourite noodle meal',
  },
  {
    src: '/tasfia.dev/about/running.jpeg',
    alt: 'Tasfia after crossing the Toronto Marathon finish line',
  },
  {
    src: '/tasfia.dev/about/sunset.jpeg',
    alt: 'A pink sunset reflected over the Toronto waterfront',
  },
  {
    src: '/tasfia.dev/about/robot-car.jpeg',
    alt: 'A small robot car being assembled on a workbench',
  },
];

const activityDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function parseActivityDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function toActivityDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildActivityWeeks(contributions: GitHubContribution[]) {
  const contributionsByDate = new Map(contributions.map((day) => [day.date, day]));
  const latestContribution = contributions.at(-1);
  const lastDate = latestContribution ? parseActivityDate(latestContribution.date) : new Date();
  const firstSunday = new Date(lastDate);
  firstSunday.setUTCDate(lastDate.getUTCDate() - lastDate.getUTCDay() - ((ACTIVITY_WEEKS - 1) * ACTIVITY_DAYS));

  return Array.from({ length: ACTIVITY_WEEKS }, (_, weekIndex) => (
    Array.from({ length: ACTIVITY_DAYS }, (_, dayIndex): ActivityDay => {
      const date = new Date(firstSunday);
      date.setUTCDate(firstSunday.getUTCDate() + (weekIndex * ACTIVITY_DAYS) + dayIndex);
      const dateKey = toActivityDate(date);
      const contribution = contributionsByDate.get(dateKey);

      return {
        date: dateKey,
        count: contribution?.count ?? 0,
        level: contribution?.level ?? 0,
        isFuture: date > lastDate,
      };
    })
  ));
}

function buildMonthLabels(weeks: ActivityDay[][]) {
  const labels = weeks.flatMap((week, weekIndex) => {
    const firstOfMonth = week.find((day) => parseActivityDate(day.date).getUTCDate() === 1);
    if (!firstOfMonth && weekIndex !== 0) return [];

    const labelDate = parseActivityDate(firstOfMonth?.date ?? week[0].date);
    return [{
      label: labelDate.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }),
      weekIndex,
    }];
  });

  return labels.length > 1 && labels[1].weekIndex - labels[0].weekIndex < 4
    ? labels.slice(1)
    : labels;
}

const LOG_ENTRIES = [
  {
    type: 'INCOMING',
    company: 'Amazon Ads',
    period: 'September–December 2026',
    role: 'Software Engineering Intern · Ads Product, AI-Generated Content',
    copy: 'Joining the Ads Product AI-generated content team to work across generative model integration and ads delivery infrastructure.',
    logo: '/tasfia.dev/logos/amazon.png',
    logoAlt: 'Amazon',
    tags: ['Generative AI', 'Ads infrastructure'],
  },
  {
    type: 'ENGINEERING',
    company: 'Shopify',
    period: 'May–August 2026',
    role: 'Software Engineering Intern · Merchant Marketing, Ads Experience',
    copy: (
      <>Designed and deployed a <strong>fault-tolerant production workflow</strong> that translated live order and attribution events into <strong>deterministic billing logic</strong>, recovering <strong>$1.4M</strong> across <strong>48,000+ orders</strong> during production incidents.</>
    ),
    logo: '/tasfia.dev/logos/shopify.png',
    logoAlt: 'Shopify',
    tags: ['Kafka', 'Reliability', 'Billing'],
    bullets: [
      <>Built the system to support incident recovery windows spanning <strong>1–7 days</strong>, representing approximately <strong>48,000–336,000 orders</strong> at observed volume.</>,
      <>Optimized <strong>high-throughput, low-latency data pipelines</strong> across <strong>Kafka, Sidekiq, and SQL-backed Vitess/GlobalDB</strong>, processing <strong>10M+ daily billing and attribution events</strong> with approximately <strong>one-second end-to-end latency</strong>.</>,
      <>Engineered <strong>idempotent, exactly-once transaction processing</strong> with retry semantics, dead-letter handling, and automated reconciliation checks, maintaining <strong>financial correctness</strong> under live production traffic while preventing duplicate charges and revenue leakage.</>,
      <>Wrote <strong>automated unit and integration tests</strong> and improved <strong>monitoring</strong>.</>,
    ],
  },
  {
    type: 'LEADERSHIP',
    company: 'Claude Builder Club @ UofT',
    period: 'September–December 2025',
    role: 'President & Claude Ambassador · Partnered with Anthropic',
    copy: (
      <>Founded and led <strong>U of T’s first Claude Builder Club</strong>, partnering with <strong>Anthropic</strong> to grow a hands-on <strong>AI builder community</strong> on campus.</>
    ),
    logo: '/tasfia.dev/logos/anthropic.png',
    logoAlt: 'Anthropic',
    tags: ['Community', 'Workshops', 'AI builders'],
    bullets: [
      <>Grew a <strong>300+ member community</strong> through <strong>hackathons, engineering challenges, and workshops</strong> across AI, full-stack development, and applied ML.</>,
      <>Designed training in <strong>prompt engineering, RAG, responsible AI evaluation, and privacy-aware deployment</strong> while leading <strong>mentorship and code reviews</strong>.</>,
    ],
  },
];

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Tasfia Ara, back to top">
        <span className="wordmark-mark">TA</span>
        <span>
          <strong>Tasfia Ara</strong>
          <small>backend + AI infrastructure</small>
        </span>
      </a>
      <nav className="main-nav" aria-label="Primary navigation">
        <a href="#top">Home</a>
        <a href="#snapshot">Dev. Snapshot</a>
        <a href="#logs">Experience</a>
        <a href="#systems">Projects</a>
        <a href="#personal">About Me</a>
      </nav>
      <a className="header-link" href="https://github.com/Tasfia-Ara" target="_blank" rel="noreferrer">
        GitHub <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </header>
  );
}

function InterestCarousel() {
  return (
    <aside className="interest-strip" aria-label="Areas Tasfia is interested in">
      <div className="system-focus-line section-shell">
        <span className="system-focus-label">INTERESTED IN</span>
        <div className="system-carousel" aria-label={`Interested in: ${SYSTEMS.join(', ')}`}>
          <div className="system-carousel-track">
            {[false, true].map((duplicate) => (
              <div className="system-carousel-group" aria-hidden={duplicate || undefined} key={duplicate ? 'duplicate' : 'primary'}>
                {SYSTEMS.map((system) => <span className="system-carousel-item" key={system}>{system}</span>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % HERO_WORDS.length);
    }, 1800);

    return () => window.clearInterval(rotation);
  }, []);

  useEffect(() => {
    const updateScrollCue = () => setShowScrollCue(window.scrollY < 80);
    updateScrollCue();
    window.addEventListener('scroll', updateScrollCue, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollCue);
  }, []);

  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy">
        <div className="eyebrow hero-status"><span className="status-dot" /> Status: Seeking Summer 2027 Internships</div>
        <h1 className="hero-title">
          <span className="hero-greeting">Hi, I’m Tasfia.</span>
          <span className="hero-build-line">
            I build <span className="hero-word-shell"><span className="hero-word" key={HERO_WORDS[wordIndex]}>{HERO_WORDS[wordIndex]}.</span></span>
          </span>
        </h1>
        <p className="hero-intro">
          I’m a fourth-year CS student at the University of Toronto focused on{' '}
          <span className="hero-emphasis">ML engineering</span>, <span className="hero-emphasis">backend systems</span>,
          {' '}and <span className="hero-emphasis">production infrastructure</span>. Current SWE Intern at Shopify;
          incoming SDE Intern at Amazon for Fall 2026.
        </p>
        <div className="hero-connect" aria-label="Contact links">
          <span className="hero-connect-label">Let’s connect</span>
          <div className="hero-connect-links">
            <a className="hero-social-link" href="https://linkedin.com/in/tasfia-ara/" target="_blank" rel="noreferrer" aria-label="Tasfia on LinkedIn">
              <Linkedin size={18} />
            </a>
            <a className="hero-social-link" href="https://github.com/Tasfia-Ara" target="_blank" rel="noreferrer" aria-label="Tasfia on GitHub">
              <Github size={18} />
            </a>
            <a className="hero-social-link" href="mailto:tasfia.ara@mail.utoronto.ca" aria-label="Email Tasfia">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="portrait-wrap">
        <div className="portrait-card">
          <img src="/tasfia.dev/profile.jpg" alt="Tasfia standing beside a forest stream" />
          <div className="portrait-caption">
            <span>the operator, off duty</span>
            <span>Lake Tahoe, CA</span>
          </div>
        </div>
        <div className="portrait-note">
          <Sparkles size={15} /> happiest near water, trees, and a hard problem
        </div>
      </div>

      <a
        className={`jump-link ${showScrollCue ? '' : 'is-hidden'}`}
        href="#logs"
        aria-hidden={!showScrollCue}
        tabIndex={showScrollCue ? undefined : -1}
      >
        <ArrowDown size={22} /> My Experience
      </a>
    </section>
  );
}

function RollingNumber({ value, suffix = '', active, delay = 0 }: { value: string; suffix?: string; active: boolean; delay?: number }) {
  return (
    <span
      className={`rolling-number ${active ? 'is-spinning' : ''}`}
      role="img"
      aria-label={`${value}${suffix}`}
      style={{ '--metric-delay': `${delay}ms` } as React.CSSProperties}
    >
      <span className="rolling-number-inner" aria-hidden="true">
        {value.split('').map((digit, index) => (
          <span className="rolling-digit" key={`${digit}-${index}`}>
            <span
              className="rolling-reel"
              style={{
                '--roll-distance': `-${Number(digit) + 10}em`,
                '--roll-delay': `${index * 70}ms`,
              } as React.CSSProperties}
            >
              {Array.from({ length: 20 }, (_, reelIndex) => <span key={reelIndex}>{reelIndex % 10}</span>)}
            </span>
          </span>
        ))}
        {suffix && <span className="rolling-suffix">{suffix}</span>}
      </span>
    </span>
  );
}

function GitHubActivity() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [activityLoaded, setActivityLoaded] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const activityRef = useRef<HTMLDivElement>(null);

  const activityWeeks = useMemo(() => buildActivityWeeks(contributions), [contributions]);
  const activityMonths = useMemo(() => buildMonthLabels(activityWeeks), [activityWeeks]);

  useEffect(() => {
    const activity = activityRef.current;
    if (!activity) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStatsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(activity);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(activity);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(GITHUB_ACTIVITY_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub activity is unavailable');
        return response.json();
      })
      .then((data: { contributions?: GitHubContribution[] }) => {
        if (Array.isArray(data.contributions)) setContributions(data.contributions);
      })
      .catch((error: Error) => {
        if (error.name !== 'AbortError') setContributions([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setActivityLoaded(true);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="github-activity project-activity" ref={activityRef}>
      <div className="developer-stats">
        <a className="dev-stat" href="https://github.com/Tasfia-Ara?tab=repositories" target="_blank" rel="noreferrer">
          <RollingNumber value="30" active={statsVisible} delay={0} />
          <span className="stat-label">Public repos</span>
          <small>on GitHub</small>
        </a>
        <div className="dev-stat">
          <RollingNumber value="14" suffix="+" active={statsVisible} delay={1050} />
          <span className="stat-label">Collaborators</span>
          <small>across public repos</small>
        </div>
        <div className="dev-stat">
          <RollingNumber value="4" active={statsVisible} delay={2100} />
          <span className="stat-label">Hackathons</span>
          <small>
            on <a className="stat-source-link" href="https://devpost.com/Tasfia-Ara/challenges" target="_blank" rel="noreferrer">
              Devpost <ArrowUpRight size={10} aria-hidden="true" />
            </a>
          </small>
        </div>
        <div className="dev-stat">
          <span className="stat-number-with-crown">
            <Crown className="stat-crown" size={22} strokeWidth={1.7} aria-hidden="true" />
            <RollingNumber value="1" active={statsVisible} delay={3150} />
          </span>
          <span className="stat-label">Hackathon wins</span>
          <small>Toronto Bioinformatics · 2024</small>
        </div>
      </div>

      <div className="activity-toolbar">
        <span>PUBLIC CONTRIBUTIONS · LAST 52 WEEKS</span>
        <a
          className="github-activity-link"
          href="https://github.com/Tasfia-Ara"
          target="_blank"
          rel="noreferrer"
        >
          View GitHub Profile <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <div className="activity-map">
        <div className="activity-scroll">
          <div className={`activity-graph ${activityLoaded ? 'is-loaded' : 'is-loading'}`}>
            <div className="activity-months" aria-hidden="true">
              {activityMonths.map((month) => (
                <span key={`${month.label}-${month.weekIndex}`} style={{ gridColumnStart: month.weekIndex + 1 }}>
                  {month.label}
                </span>
              ))}
            </div>
            <div
              className="activity-grid"
              role="img"
              aria-label="Tasfia’s public GitHub contributions over the past 52 weeks"
            >
              {activityWeeks.map((week, weekIndex) => (
                <div
                  className="activity-week"
                  key={week[0].date}
                  style={{ '--week-index': weekIndex } as React.CSSProperties}
                >
                  {week.map((day) => {
                    const formattedDate = activityDateFormatter.format(parseActivityDate(day.date));
                    const contributionLabel = `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} · ${formattedDate}`;

                    return (
                      <span
                        className={`activity-cell ${day.isFuture ? 'is-future' : ''}`}
                        data-level={day.level}
                        data-tooltip={day.isFuture ? formattedDate : contributionLabel}
                        key={day.date}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="language-carousel-line">
        <span className="language-carousel-label">LANGUAGES I BUILD WITH</span>
        <div className="language-carousel" aria-label={`Languages I build with: ${LANGUAGES.join(', ')}`}>
          <div className="language-carousel-track">
            {[false, true].map((duplicate) => (
              <div className="language-carousel-group" aria-hidden={duplicate || undefined} key={duplicate ? 'duplicate' : 'primary'}>
                {LANGUAGES.map((language) => (
                  <span className="language-carousel-item" key={language}>{language}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RespiraGallery() {
  const [activeImage, setActiveImage] = useState(0);
  const image = RESPIRA_GALLERY[activeImage];

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + RESPIRA_GALLERY.length) % RESPIRA_GALLERY.length);
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % RESPIRA_GALLERY.length);
  };

  return (
    <figure className="respira-gallery">
      <div className={`respira-gallery-frame ${activeImage === 2 ? 'has-square-image' : ''}`}>
        {activeImage === 2 && (
          <span
            className="respira-gallery-backdrop"
            style={{ backgroundImage: `url(${image.src})` }}
            aria-hidden="true"
          />
        )}
        <img className="respira-gallery-image" key={image.src} src={image.src} alt={image.alt} />
        <button
          className="respira-gallery-control respira-gallery-previous"
          type="button"
          onClick={showPreviousImage}
          aria-label={`Show previous RespiraCheck image. Currently showing ${activeImage + 1} of ${RESPIRA_GALLERY.length}`}
        >
          <ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button
          className="respira-gallery-control respira-gallery-next"
          type="button"
          onClick={showNextImage}
          aria-label={`Show next RespiraCheck image. Currently showing ${activeImage + 1} of ${RESPIRA_GALLERY.length}`}
        >
          <ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
      <figcaption aria-live="polite">
        <span>{String(activeImage + 1).padStart(2, '0')} / {String(RESPIRA_GALLERY.length).padStart(2, '0')}</span>
        {image.caption}
      </figcaption>
    </figure>
  );
}

function DeveloperSnapshot() {
  return (
    <section className="developer-snapshot section-shell section-block" id="snapshot">
      <div className="experience-header developer-snapshot-header">
        <h2>Developer Snapshot</h2>
      </div>
      <GitHubActivity />
    </section>
  );
}

function Systems() {
  return (
    <section className="section-shell section-block" id="systems">
      <div className="experience-header project-section-header">
        <h2>Projects I’ve worked on</h2>
      </div>

      <div className="project-showcase-list">
        <article className="feature-system project-showcase">
          <div className="feature-copy">
            <div className="project-kicker">01 · APPLIED ML RESEARCH · 2025</div>
            <h3>RespiraCheck</h3>
            <p className="project-lede">A cough-classification system exploring accessible, non-invasive respiratory screening.</p>
            <p>
              We transformed cough audio into Mel spectrograms and fine-tuned a ResNet-18 on a balanced dataset of
              8,000 samples, pairing the model with a web experience for recording or uploading a cough.
              <span className="project-presentation-line">
                Presented at the Canadian Undergraduate Conference in AI (CUCAI) 2025.
              </span>
              <a className="project-publication-link" href="https://cucai.ca/2025/papers/e1lKWJ" target="_blank" rel="noreferrer">
                Publication: CUCAI 2025 Conference Proceedings
              </a>
            </p>
            <div className="tag-list">
              <span>Python</span><span>ResNet-18</span><span>Audio ML</span><span>Next.js</span>
            </div>
            <div className="project-links">
              <a className="text-link" href="https://github.com/Tasfia-Ara/RespiraCheck" target="_blank" rel="noreferrer">
                View repository <ArrowUpRight size={16} />
              </a>
              <a className="text-link" href="https://respira-check-liard.vercel.app" target="_blank" rel="noreferrer">
                Live demo <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <RespiraGallery />
        </article>

        <article className="feature-system project-showcase rna-card">
          <div className="feature-copy">
            <div className="project-kicker">02 · BIOINFORMATICS + ML · 2024</div>
            <h3>RNA Expression Predictor</h3>
            <p>
              Built an ML model that predicts mouse brain cell-type expression from RNA sequences using single-nucleus RNA-seq data.{' '}
              <a className="project-description-link" href="https://www.linkedin.com/posts/tasfia-ara_toronto-bioinformatics-hackathon-activity-7249637214454779904-25RX" target="_blank" rel="noreferrer">
                Won 1st place at the Toronto Bioinformatics Hackathon.
              </a>
            </p>
            <div className="tag-list"><span>Python</span><span>scikit-learn</span><span>Genomics</span></div>
            <div className="project-links">
              <a className="text-link" href="https://github.com/hackbio-ca/rna-expression-from-sequence" target="_blank" rel="noreferrer">
                View repository <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <figure className="project-showcase-visual rna-project-visual">
            <span
              className="rna-project-backdrop"
              style={{ backgroundImage: "url('/tasfia.dev/projects/rna-expression-predictor/hackathon-win.jpg')" }}
              aria-hidden="true"
            />
            <img
              className="rna-project-image"
              src="/tasfia.dev/projects/rna-expression-predictor/hackathon-win.jpg"
              alt="Tasfia and her teammates celebrating their first-place win at the Toronto Bioinformatics Hackathon"
            />
          </figure>
        </article>

        <article className="feature-system project-showcase vistex-card">
          <div className="feature-copy">
            <div className="project-kicker">03 · GENERATIVE AI TOOL · 2026</div>
            <h3>VisTeX</h3>
            <p>A VS Code extension that turns LaTeX equations into interactive 2D and 3D visualizations, with AI suggestions and source-linked previews.</p>
            <div className="tag-list"><span>TypeScript</span><span>VS Code</span><span>Plotly</span></div>
            <div className="project-links">
              <a className="text-link" href="https://github.com/xiaotong-shen/VisTeX" target="_blank" rel="noreferrer">
                View repository <ArrowUpRight size={16} />
              </a>
              <a className="text-link" href="https://devpost.com/software/vistex" target="_blank" rel="noreferrer">
                Live demo <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <figure className="project-showcase-visual project-photo-visual">
            <span
              className="project-photo-backdrop"
              style={{ backgroundImage: "url('/tasfia.dev/projects/vistex/genai-genesis-team.webp')" }}
              aria-hidden="true"
            />
            <img
              className="project-photo-image"
              src="/tasfia.dev/projects/vistex/genai-genesis-team.webp"
              alt="Tasfia and the VisTeX team building together at GenAI Genesis 2026"
            />
            <span className="metric-chip">GenAI Genesis · 2026</span>
          </figure>
        </article>

      </div>
    </section>
  );
}

function ExperienceLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`experience-section section-block ${isVisible ? 'is-visible' : ''}`}
      id="logs"
    >
      <div className="experience-inner section-shell">
        <div className="experience-header">
          <h2>What I’ve been up to</h2>
        </div>

        <div className="log-list">
          {LOG_ENTRIES.map((entry) => (
            <article className="log-entry" key={entry.company}>
              <div className="log-rail">
                <div className="log-logo-tile">
                  <img className="log-logo" src={entry.logo} alt={`${entry.logoAlt} logo`} />
                </div>
              </div>
              <div className="log-content">
                <div className="log-heading-row">
                  <h3>{entry.company}</h3>
                  <span className="log-period">{entry.period}</span>
                </div>
                <p className="log-role">{entry.role}</p>
                {entry.bullets ? (
                  <ul className="log-bullets">
                    {[entry.copy, ...entry.bullets].map((bullet, index) => <li key={`${entry.company}-${index}`}>{bullet}</li>)}
                  </ul>
                ) : (
                  <p>{entry.copy}</p>
                )}
                <div className="log-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="log-meta-row">
                  <small className="log-label">{entry.type}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Person() {
  const [personalPhotoIndex, setPersonalPhotoIndex] = useState(0);
  const showPreviousPhoto = () => {
    setPersonalPhotoIndex((current) => (current - 1 + PERSONAL_PHOTOS.length) % PERSONAL_PHOTOS.length);
  };
  const showNextPhoto = () => {
    setPersonalPhotoIndex((current) => (current + 1) % PERSONAL_PHOTOS.length);
  };

  return (
    <section className="person-section section-shell" id="personal">
      <div className="experience-header person-section-header">
        <h2>Who I am</h2>
      </div>
      <div className="person-layout">
        <div className="personal-card-carousel" aria-label="A few things I love outside of work">
          <div className="personal-card-stack">
            {PERSONAL_PHOTOS.map((photo, index) => {
              const offset = (index - personalPhotoIndex + PERSONAL_PHOTOS.length) % PERSONAL_PHOTOS.length;
              if (offset > 2) return null;

              return (
                <figure
                  className="personal-profile-card"
                  data-offset={offset}
                  aria-hidden={offset !== 0}
                  key={photo.src}
                >
                  <img src={photo.src} alt={offset === 0 ? photo.alt : ''} loading="lazy" decoding="async" />
                </figure>
              );
            })}
          </div>
          <button className="personal-card-control personal-card-previous" type="button" onClick={showPreviousPhoto} aria-label="Show previous personal photo">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button className="personal-card-control personal-card-next" type="button" onClick={showNextPhoto} aria-label="Show next personal photo">
            <ChevronRight size={22} aria-hidden="true" />
          </button>
          <span className="personal-card-counter" aria-live="polite">
            {String(personalPhotoIndex + 1).padStart(2, '0')} / {String(PERSONAL_PHOTOS.length).padStart(2, '0')}
          </span>
        </div>
        <div className="person-copy">
          <p>
            When I’m not building, I gravitate toward nature, food (naturally), sports, and photography. My current
            obsessions are running, climbing, and lifting.
          </p>
          <p>
            And every so often, I circle right back to being geeky—usually tinkering with something that moves.
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-shell" id="contact">
      <h2>Let’s Chat!</h2>
      <div className="contact-actions">
        <a className="contact-link" href="mailto:tasfia.ara@mail.utoronto.ca"><Mail size={17} /> Email</a>
        <a className="contact-link" href="https://linkedin.com/in/tasfia-ara/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
        <a className="contact-link" href="https://github.com/Tasfia-Ara" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
        <a className="contact-link" href="https://drive.google.com/file/d/1fou4pVJ727LdWbpp8GcsLhEqYqUbDmx1/view?usp=sharing" target="_blank" rel="noreferrer"><FileText size={17} /> Résumé</a>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <InterestCarousel />
      <main>
        <Hero />
        <DeveloperSnapshot />
        <ExperienceLog />
        <Systems />
        <Person />
        <Contact />
      </main>
      <footer className="site-footer section-shell">
        <span>Tasfia Ara © 2026</span>
        <span>Built with React + TypeScript · designed like a living system</span>
      </footer>
    </>
  );
}

const container = document.getElementById('root');
if (container) createRoot(container).render(<App />);
