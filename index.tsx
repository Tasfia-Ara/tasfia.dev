import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from 'lucide-react';
import './styles.css';

const TRACE_STEPS = [
  {
    label: '01 / ingest',
    title: 'Read the repository',
    detail: 'Snapshot the codebase, normalize source files, and establish a clean boundary for everything downstream.',
  },
  {
    label: '02 / map',
    title: 'Build useful context',
    detail: 'Map modules and dependencies before chunking so the model sees structure—not a bag of unrelated files.',
  },
  {
    label: '03 / queue',
    title: 'Control the work',
    detail: 'Push independent jobs through workers with explicit concurrency, retry, and backpressure decisions.',
  },
  {
    label: '04 / synthesize',
    title: 'Generate the guide',
    detail: 'Turn model output into concise text and voice summaries while preserving links back to the source.',
  },
  {
    label: '05 / deliver',
    title: 'Meet the developer',
    detail: 'Deliver the result through a Kotlin Multiplatform experience designed for learning away from the desk.',
  },
];

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
    moments: [
      { kind: 'photo', title: 'Amazon Ads', caption: 'Starting September 2026', placeholder: 'Coming Soon!' },
      { kind: 'photo', title: 'Team moments', caption: 'Photos coming this fall', placeholder: 'Coming Soon!' },
      { kind: 'video', title: 'Internship reel', caption: 'A future video slot', placeholder: 'Coming Soon!' },
    ],
  },
  {
    type: 'ENGINEERING',
    company: 'Shopify',
    period: 'May–August 2026',
    role: 'Software Engineering Intern · Merchant Marketing, Ads Experience',
    copy: 'Worked on the infrastructure behind Shopify’s Ads billing and campaign spend systems, with a focus on reliability, recovery, and real-time processing.',
    logo: '/tasfia.dev/logos/shopify.png',
    logoAlt: 'Shopify',
    tags: ['Kafka', 'Reliability', 'Billing'],
    bullets: [
      'Built fault-tolerant order reprocessing that recovers 10,000–100,000+ orders per cycle and protects an estimated $10M+ in merchant revenue.',
      'Shipped Kafka and Sidekiq pipelines processing 10M+ daily billing and attribution events at approximately one-second end-to-end latency.',
    ],
    moments: [
      { kind: 'photo', title: 'Team moments', caption: 'Shopify · summer 2026' },
      { kind: 'photo', title: 'Shopify Summit', caption: 'Learning with builders' },
      { kind: 'video', title: 'Internship reel', caption: 'A future video slot' },
    ],
  },
  {
    type: 'LEADERSHIP',
    company: 'Claude Builder Club @ UofT',
    period: 'September–December 2025',
    role: 'President & Claude Ambassador · Partnered with Anthropic',
    copy: 'Founded and led U of T’s first Claude Builder Club, partnering with Anthropic to grow a hands-on AI builder community on campus.',
    logo: '/tasfia.dev/logos/anthropic.png',
    logoAlt: 'Anthropic',
    tags: ['Community', 'Workshops', 'AI builders'],
    bullets: [
      'Grew a 300+ member community through hackathons, engineering challenges, and workshops across AI, full-stack development, and applied ML.',
      'Designed training in prompt engineering, RAG, responsible AI evaluation, and privacy-aware deployment while leading mentorship and code reviews.',
    ],
    moments: [
      { kind: 'photo', title: 'Builder nights', caption: 'Claude Builder Club @ UofT' },
      { kind: 'photo', title: 'Workshop day', caption: 'Building with Claude' },
      { kind: 'video', title: 'Hackathon recap', caption: 'A future video slot' },
    ],
  },
];

const TOOLKIT_GROUPS = [
  {
    index: '01',
    title: 'Backend + distributed systems',
    copy: 'The machinery I use to move data safely and keep services dependable.',
    tools: ['Ruby on Rails', 'Kafka', 'Sidekiq', 'GraphQL', 'Vitess', 'PostgreSQL'],
  },
  {
    index: '02',
    title: 'ML + ranking',
    copy: 'The modeling layer behind recommendations, intelligent products, and experiments.',
    tools: ['Python', 'PyTorch', 'TensorFlow', 'Recommender systems', 'A/B testing', 'LLMs + RAG'],
  },
  {
    index: '03',
    title: 'Infrastructure + product',
    copy: 'The tools I reach for to ship, observe, and iterate on real products.',
    tools: ['Docker', 'AWS', 'GCP', 'CI/CD', 'TypeScript', 'React'],
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
        <a href="#logs">Experience</a>
        <a href="#systems">Systems</a>
        <a href="#toolkit">Toolkit</a>
        <a href="#personal">Personal</a>
      </nav>
      <a className="header-link" href="https://github.com/Tasfia-Ara" target="_blank" rel="noreferrer">
        GitHub <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </header>
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
        <div className="eyebrow"><span className="status-dot" /> Status: Seeking Summer 2027 Internships</div>
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

function SignalStrip() {
  return (
    <section className="signal-strip section-shell" aria-label="Current signals">
      <div className="signal-label">CURRENT<br />SIGNALS</div>
      <div className="signal-item"><small>building</small><strong>GitWispr</strong></div>
      <div className="signal-item"><small>exploring</small><strong>AI infrastructure</strong></div>
      <div className="signal-item"><small>organizing</small><strong>Claude Builder Club</strong></div>
      <div className="signal-item"><small>default mode</small><strong>curious, then methodical</strong></div>
    </section>
  );
}

function TraceDemo() {
  const [activeStep, setActiveStep] = useState(2);
  const active = TRACE_STEPS[activeStep];

  return (
    <div className="trace-panel">
      <div className="panel-chrome">
        <span><span className="status-dot" /> request trace / gitwispr</span>
        <span>prototype topology</span>
      </div>
      <div className="trace-map" aria-label="Interactive GitWispr request trace">
        {TRACE_STEPS.map((step, index) => (
          <React.Fragment key={step.label}>
            <button
              className={`trace-node ${index === activeStep ? 'is-active' : ''} ${index < activeStep ? 'is-complete' : ''}`}
              type="button"
              onClick={() => setActiveStep(index)}
              aria-pressed={index === activeStep}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {step.label.split(' / ')[1]}
            </button>
            {index < TRACE_STEPS.length - 1 && <span className={`trace-line ${index < activeStep ? 'is-complete' : ''}`} aria-hidden="true" />}
          </React.Fragment>
        ))}
      </div>
      <div className="trace-readout" aria-live="polite">
        <span>{active.label}</span>
        <div>
          <h3>{active.title}</h3>
          <p>{active.detail}</p>
        </div>
      </div>
    </div>
  );
}

function GitHubActivity() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [activityLoaded, setActivityLoaded] = useState(false);

  const activityWeeks = useMemo(() => buildActivityWeeks(contributions), [contributions]);
  const activityMonths = useMemo(() => buildMonthLabels(activityWeeks), [activityWeeks]);

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
    <div className="github-activity project-activity">
      <a
        className="github-activity-link"
        href="https://github.com/Tasfia-Ara"
        target="_blank"
        rel="noreferrer"
      >
        View GitHub Profile <ArrowUpRight size={14} aria-hidden="true" />
      </a>
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
    </div>
  );
}

function Systems() {
  return (
    <section className="section-shell section-block" id="systems">
      <div className="section-heading">
        <div><span className="section-index">02</span><p>Selected systems</p></div>
        <h2>Projects are easier to trust when you can see the decisions inside them.</h2>
      </div>

      <GitHubActivity />

      <article className="feature-system">
        <div className="feature-copy">
          <div className="project-kicker">FLAGSHIP SYSTEM · 2026</div>
          <h3>GitWispr</h3>
          <p className="project-lede">A cross-platform guide that turns unfamiliar repositories into digestible audio and text.</p>
          <p>
            The interesting problem isn’t only generation. It’s organizing context, coordinating concurrent work,
            handling partial failure, and giving developers a result they can trace back to source.
          </p>
          <div className="tag-list">
            <span>Kotlin Multiplatform</span><span>LLMs</span><span>Async work</span><span>Voice AI</span>
          </div>
          <a className="text-link" href="https://github.com/Tasfia-Ara/GitWispr" target="_blank" rel="noreferrer">
            View GitWispr on GitHub <ArrowUpRight size={16} />
          </a>
        </div>
        <TraceDemo />
      </article>

      <div className="supporting-grid">
        <article className="project-card research-card">
          <div className="project-visual waveform" role="img" aria-label="Layered waveform illustration for RespiraCheck">
            <span className="wave wave-one" /><span className="wave wave-two" /><span className="wave wave-three" />
            <span className="metric-chip">+20% model accuracy</span>
          </div>
          <div className="project-body">
            <span className="project-kicker">RESEARCH PIPELINE</span>
            <h3>RespiraCheck</h3>
            <p>A CNN system for respiratory cough classification, tuned through structured experimentation and presented at CUCAI 2025.</p>
            <div className="tag-list"><span>Python</span><span>ResNet</span><span>TensorFlow</span></div>
            <span className="project-note">Presented at CUCAI 2025</span>
          </div>
        </article>

        <article className="project-card product-card">
          <a className="project-visual topology" href="https://github.com/Tasfia-Ara/CS-Help-AI-Chatbot" target="_blank" rel="noreferrer" aria-label="Open the AI CS Mentor repository">
            <span className="topology-node node-user">student</span>
            <span className="topology-node node-api">api</span>
            <span className="topology-node node-model">model</span>
            <span className="topology-node node-store">context</span>
            <svg viewBox="0 0 600 260" role="img" aria-label="Service topology illustration">
              <path d="M115 130 C190 130 205 74 285 74" />
              <path d="M115 130 C190 130 205 190 285 190" />
              <path d="M350 74 C430 74 430 130 500 130" />
              <path d="M350 190 C430 190 430 130 500 130" />
            </svg>
            <span className="metric-chip">1,000+ users</span>
          </a>
          <div className="project-body">
            <span className="project-kicker">PRODUCTION AI APP</span>
            <h3>AI CS Mentor</h3>
            <p>An AI learning experience deployed on AWS—an early lesson in APIs, product feedback, and operating beyond localhost.</p>
            <div className="tag-list"><span>React</span><span>Node.js</span><span>OpenAI</span><span>AWS</span></div>
            <a className="text-link" href="https://github.com/Tasfia-Ara/CS-Help-AI-Chatbot" target="_blank" rel="noreferrer">
              Open the repository <ArrowUpRight size={16} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="toolkit section-shell" id="toolkit">
      <div className="toolkit-intro">
        <span className="section-index">03</span>
        <h2>Tools I reach for.</h2>
        <p>A practical map of the technologies I’ve used to build systems, models, and products.</p>
      </div>
      <div className="toolkit-list">
        {TOOLKIT_GROUPS.map((group) => (
          <div className="toolkit-group" key={group.index}>
            <span>{group.index}</span>
            <div>
              <h3>{group.title}</h3>
              <p>{group.copy}</p>
              <div className="toolkit-tags">{group.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExperienceLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

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

        <div className="log-list" onClick={() => setExpandedEntry(null)}>
          {LOG_ENTRIES.map((entry) => {
            const momentsId = `${entry.company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-moments`;
            const isExpanded = expandedEntry === entry.company;

            return (
            <article
              className={`log-entry ${entry.moments ? 'has-moments' : ''} ${isExpanded ? 'is-expanded' : ''}`}
              key={entry.company}
              onClick={entry.moments ? (event) => {
                event.stopPropagation();
                setExpandedEntry(isExpanded ? null : entry.company);
              } : undefined}
            >
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
                    {[entry.copy, ...entry.bullets].map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : (
                  <p>{entry.copy}</p>
                )}
                <div className="log-tags">{entry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="log-meta-row">
                  <small className="log-label">{entry.type}</small>
                  {entry.moments && (
                    <button
                      className="moments-hint"
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={momentsId}
                      onClick={(event) => {
                        event.stopPropagation();
                        setExpandedEntry(isExpanded ? null : entry.company);
                      }}
                    >
                      <span className="moments-copy-desktop">
                        {isExpanded ? 'Snapshots pinned · click to close' : `${entry.moments.length} snapshots · hover or click`}
                      </span>
                      <span className="moments-copy-mobile">
                        {isExpanded ? 'Snapshots open · tap to close' : `${entry.moments.length} snapshots · tap to open`}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {entry.moments && (
                  <div className="moments-panel" id={momentsId}>
                    <div className="moments-polaroids">
                      {entry.moments.map((moment, index) => (
                        <figure
                          className={`moment-polaroid moment-${index + 1} ${moment.kind === 'video' ? 'is-video' : ''}`}
                          key={moment.title}
                        >
                          <div className="moment-image">
                            {'placeholder' in moment ? (
                              <span className="moment-placeholder">{moment.placeholder}</span>
                            ) : (
                              <img src={entry.logo} alt="" />
                            )}
                            {moment.kind === 'video' && !('placeholder' in moment) && (
                              <span className="moment-play" aria-hidden="true"><span /></span>
                            )}
                          </div>
                          <figcaption>
                            <strong>{moment.title}</strong>
                            <small>{moment.caption}</small>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
              )}
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Person() {
  return (
    <section className="person-section section-shell" id="personal">
      <div className="person-copy">
        <span className="section-index">04</span>
        <h2>Systems are only half the story.</h2>
        <p>
          I’m passionate about building resilient, scalable software, learning new AI tools, and bringing people
          together in tech. I founded U of T’s first Claude Builder Club with sponsorship from Anthropic.
        </p>
        <p>
          When I step away from a debugger, I gravitate toward places where the signal drops: coastlines, trails, and big trees.
        </p>
      </div>
      <div className="current-board">
        <div className="board-title"><Boxes size={18} /> PERSONAL INDEX <span>living shelf</span></div>
        <div className="board-row"><small>on repeat</small><strong>lo-fi for deep work and late-night builds</strong></div>
        <div className="board-row"><small>camera roll</small><strong>Lake Tahoe, coastlines, and big trees</strong></div>
        <div className="board-row"><small>recently</small><strong>Shopify Summit</strong></div>
        <div className="board-row"><small>community</small><strong>Claude Builder Club @ UofT</strong></div>
        <div className="board-note">A future home for playlists, photo sets, and field notes from rooms full of builders.</div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-shell" id="contact">
      <div>
        <span className="eyebrow">OPEN CHANNEL</span>
        <h2>Let’s talk about systems, AI infrastructure, or a project you can’t stop thinking about.</h2>
      </div>
      <div className="contact-actions">
        <a className="button button-light" href="mailto:tasfia.ara@mail.utoronto.ca"><Mail size={17} /> Email Tasfia</a>
        <a className="social-link" href="https://linkedin.com/in/tasfia-ara/" target="_blank" rel="noreferrer" aria-label="Tasfia on LinkedIn"><Linkedin size={19} /></a>
        <a className="social-link" href="https://github.com/Tasfia-Ara" target="_blank" rel="noreferrer" aria-label="Tasfia on GitHub"><Github size={19} /></a>
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ExperienceLog />
        <Systems />
        <Toolkit />
        <SignalStrip />
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
