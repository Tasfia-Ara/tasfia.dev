import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  University,
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

const LOG_ENTRIES = [
  {
    type: 'INCOMING',
    company: 'Amazon Ads',
    role: 'Software Engineering Intern · Ads Product, AI-Generated Content',
    copy: 'Joining the Ads Product AI-generated content team to work across generative model integration and ads delivery infrastructure.',
    logo: '/tasfia.dev/logos/amazon.png',
    logoAlt: 'Amazon',
  },
  {
    type: 'ENGINEERING',
    company: 'Shopify',
    role: 'Software Engineering Intern · Merchant Marketing, Ads Experience',
    copy: 'Built fault-tolerant recovery workflows and real-time Kafka pipelines for Ads billing, processing 10M+ daily events and protecting merchant revenue.',
    logo: '/tasfia.dev/logos/shopify.png',
    logoAlt: 'Shopify',
  },
  {
    type: 'LEADERSHIP',
    company: 'Claude Builder Club @ UofT',
    role: 'President & Claude Ambassador · Partnered with Anthropic',
    copy: 'Led a 300+ member builder community, creating workshops, hackathons, and engineering challenges with Anthropic.',
    logo: '/tasfia.dev/logos/anthropic.png',
    logoAlt: 'Anthropic',
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
        <a href="#logs">Logs</a>
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
          I’m Tasfia—a backend engineer who loves figuring out how things work, building systems people can
          rely on, and creating communities along the way.
        </p>
        <div className="hero-actions">
          <a className="button button-quiet" href="mailto:tasfia.ara@mail.utoronto.ca">Say hello <ArrowUpRight size={16} /></a>
        </div>
        <div className="hero-facts" aria-label="Quick facts">
          <span><MapPin size={15} /> Toronto, Canada</span>
          <span><University size={15} /> University of Toronto: CS (ML/AI focus) + Mol. Biology</span>
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
        <ArrowDown size={17} /> Explore the logs
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

function Systems() {
  return (
    <section className="section-shell section-block" id="systems">
      <div className="section-heading">
        <div><span className="section-index">02</span><p>Selected systems</p></div>
        <h2>Projects are easier to trust when you can see the decisions inside them.</h2>
      </div>

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
  return (
    <section className="section-shell section-block" id="logs">
      <div className="section-heading compact">
        <div><span className="section-index">01</span><p>Experience log</p></div>
        <h2>Where I’ve been building.</h2>
      </div>
      <div className="log-list">
        {LOG_ENTRIES.map((entry) => (
          <article className="log-entry" key={entry.company}>
            <div className="log-logo-tile">
              <img className="log-logo" src={entry.logo} alt={`${entry.logoAlt} logo`} />
            </div>
            <div className="log-content">
              <h3>{entry.company}</h3>
              <p className="log-role">{entry.role}</p>
              <p>{entry.copy}</p>
              <small className="log-label">{entry.type}</small>
            </div>
          </article>
        ))}
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
          I like building things that help people understand something difficult—whether that means making a codebase
          less intimidating, mentoring a first-time builder, or organizing a room full of curious students.
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
