import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Github, 
  Linkedin, 
  ChevronRight, 
  ArrowUpRight,
  Hash,
  GitBranch,
  Layers,
  Mail,
  ExternalLink
} from 'lucide-react';
import { PROJECTS, EXPERIENCES, SKILLS } from './constants';

const Navbar = ({ isExplored }: { isExplored: boolean }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-5 glass flex justify-between items-center transition-all duration-700 ${isExplored ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white mono font-bold text-xs shadow-sm">T</div>
        <div className="text-[10px] font-bold tracking-[0.25em] text-zinc-900 uppercase mono">TASFIA.LOG</div>
      </div>
      <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mono">
        <button onClick={() => scrollTo('projects')} className="hover:text-indigo-600 transition-colors">projects</button>
        <button onClick={() => scrollTo('history')} className="hover:text-indigo-600 transition-colors">history</button>
        <button onClick={() => scrollTo('stack')} className="hover:text-indigo-600 transition-colors">stack</button>
        <button onClick={() => scrollTo('contact')} className="hover:text-indigo-600 transition-colors">contact</button>
      </div>
    </nav>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => (
  <section className="min-h-screen flex items-center px-6 max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 w-full">
      <div className="flex-1 space-y-10 animate-in slide-in-from-left-8 duration-700">
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded bg-white border border-zinc-200 mono text-[10px] font-bold text-zinc-500 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          system_status: seeking_2026_summer_internships
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-zinc-800 leading-[1.1]">
            👋 hi there, I'm <span className="text-indigo-600 font-semibold">Tasfia</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-xl leading-relaxed font-normal">
            3rd-year CS & Stats @ UofT. Engineer focused on <span className="text-zinc-900 font-medium">ML engineering</span> and <span className="text-zinc-900 font-medium">backend systems</span>.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 pt-4">
          <button 
            onClick={onExplore}
            className="px-8 py-4 rounded bg-zinc-900 text-white font-bold text-sm hover:bg-indigo-600 transition-all flex items-center gap-3 shadow-2xl shadow-zinc-200 active:scale-95"
          >
            Initialize Exploration <ChevronRight size={18} />
          </button>
          <div className="flex gap-2">
            <a href="https://linkedin.com/in/tasfia-ara/" target="_blank" rel="noopener noreferrer" className="p-4 rounded border border-zinc-200 text-zinc-400 hover:text-indigo-600 transition-all bg-white hover:border-indigo-200">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/Tasfia-Ara" target="_blank" rel="noopener noreferrer" className="p-4 rounded border border-zinc-200 text-zinc-400 hover:text-indigo-600 transition-all bg-white hover:border-indigo-200">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Profile picture section - commented out temporarily */}
      {/* <div className="w-full md:w-[400px] flex-shrink-0 animate-in slide-in-from-right-8 duration-700">
        <div className="profile-frame rounded-3xl rotate-2 group hover:rotate-0 transition-transform duration-700 shadow-2xl">
          <div className="w-full aspect-square bg-zinc-50 rounded-2xl overflow-hidden relative">
            <img
              src="/profile.jpg"
              alt="Tasfia Ara Profile"
              className="w-full h-full object-cover grayscale brightness-105 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-indigo-500/5 mix-blend-multiply"></div>
          </div>
          <div className="mt-4 flex justify-between items-center mono text-[9px] font-bold text-zinc-400 uppercase tracking-widest px-1">
            <span>me at Big Sur, CA (hint: I love nature!) </span>
            <span>BUILD_V3</span>
          </div>
        </div>
      </div> */}
    </div>
  </section>
);

const ProjectCard: React.FC<{ project: typeof PROJECTS[0] }> = ({ project }) => (
  <div className="dev-card group rounded-2xl overflow-hidden flex flex-col h-full bg-white">
    <div className="h-48 overflow-hidden relative border-b border-zinc-50 grayscale group-hover:grayscale-0 transition-all duration-700">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
      <div className="absolute top-4 left-4">
        <div className="px-2 py-1 rounded bg-zinc-900/80 backdrop-blur-md mono text-[8px] font-bold tracking-widest uppercase text-white border border-white/10">
          <GitBranch size={10} className="inline mr-1" /> main/{project.category === 'AI/ML' ? 'research' : 'fullstack'}
        </div>
      </div>
    </div>
    <div className="p-8 flex flex-col flex-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-zinc-900">{project.title}</h3>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-zinc-900 transition-colors">
          <Github size={18} />
        </a>
      </div>
      <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-1 font-medium">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map(t => (
          <span key={t} className="mono text-[9px] font-bold text-zinc-400 bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
            {t}
          </span>
        ))}
      </div>
      <a 
        href={project.github} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-between w-full px-5 py-3 bg-zinc-50 hover:bg-zinc-900 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
      >
        View Source <ArrowUpRight size={14} />
      </a>
    </div>
  </div>
);

const ExplorationView = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'ai_research') return p.category === 'AI/ML';
    if (filter === 'fullstack') return p.category === 'Full-stack';
    return true;
  });

  return (
    <div className="animate-in slide-in-from-bottom-12 duration-1000 space-y-32">
      <section id="projects" className="py-32 border-t border-zinc-100 scroll-mt-24">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="mono text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">/repositories</h2>
            <p className="text-4xl font-bold text-zinc-900 tracking-tight">projects</p>
          </div>
          <div className="flex gap-8 text-[10px] mono font-bold text-zinc-400 uppercase">
            <button 
              onClick={() => setFilter('all')}
              className={`transition-all duration-300 pb-2 border-b-2 ${filter === 'all' ? 'text-indigo-600 border-indigo-600' : 'border-transparent hover:text-zinc-900'}`}
            >
              all_work
            </button>
            <button 
              onClick={() => setFilter('ai_research')}
              className={`transition-all duration-300 pb-2 border-b-2 ${filter === 'ai_research' ? 'text-indigo-600 border-indigo-600' : 'border-transparent hover:text-zinc-900'}`}
            >
              ai_research
            </button>
            <button 
              onClick={() => setFilter('fullstack')}
              className={`transition-all duration-300 pb-2 border-b-2 ${filter === 'fullstack' ? 'text-indigo-600 border-indigo-600' : 'border-transparent hover:text-zinc-900'}`}
            >
              fullstack
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      <section id="history" className="py-32 border-t border-zinc-100 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 space-y-6">
            <h2 className="mono text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">/history</h2>
            <p className="text-4xl font-bold text-zinc-900 tracking-tight leading-snug">
              history
            </p>
            <div className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm">
              <span className="block mono text-[10px] text-zinc-300 uppercase tracking-widest mb-2">Network</span>
              <p className="text-sm font-medium text-zinc-600 leading-relaxed">
                Building at the intersection of performance and intelligent automation. Currently focused on ML/Backend infrastructure.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-16">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group pl-10 border-l border-zinc-100 hover:border-indigo-600 transition-colors duration-500 pb-12 last:pb-0">
                <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-white border-2 border-zinc-200 group-hover:border-indigo-600 transition-all duration-500"></div>
                <div className="flex flex-col md:flex-row md:justify-between items-start mb-6 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{exp.role}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="mono text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{exp.company}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
                      <span className="mono text-[11px] text-zinc-300 font-bold">{exp.period}</span>
                    </div>
                  </div>
                  <span className="text-xl p-3 bg-zinc-50 rounded-xl font-bold text-indigo-600 grayscale group-hover:grayscale-0 transition-all">
                    {exp.logo}
                  </span>
                </div>
                <ul className="space-y-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-zinc-500 text-sm leading-relaxed flex gap-4">
                      <span className="text-indigo-300 mono font-bold">{'>>>'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="py-32 border-t border-zinc-100 scroll-mt-24">
        <div className="bg-white rounded-3xl p-12 border border-zinc-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-40"></div>
          <div className="flex items-center gap-4 mb-20">
            <Layers size={22} className="text-indigo-600" />
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">stack</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {SKILLS.map(skill => (
              <div key={skill.category} className="group">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-5 bg-zinc-100 group-hover:bg-indigo-600 transition-colors"></div>
                  <h4 className="mono text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{skill.category}</h4>
                </div>
                <div className="flex flex-col gap-5">
                  {skill.items.map(item => (
                    <span key={item} className="text-lg font-bold text-zinc-500 hover:text-indigo-600 transition-colors flex items-center gap-3 cursor-default">
                      <Hash size={14} className="text-zinc-100" /> {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 border-t border-zinc-100 scroll-mt-24">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="mono text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">/outreach</h2>
            <p className="text-4xl font-bold text-zinc-900 tracking-tight">contact</p>
          </div>
          <p className="text-xl text-zinc-500 leading-relaxed font-normal max-w-2xl mx-auto">
            Currently seeking <span className="text-zinc-900 font-medium">Summer 2026 SWE Internships</span>. 
            Open to roles in Fintech, AI infrastructure, and Backend development. Let's connect.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 pt-8">
            <a 
              href="mailto:tasfia.ara@mail.utoronto.ca" 
              className="flex items-center justify-center gap-3 px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-xl active:scale-95 group"
            >
              <Mail size={18} className="group-hover:rotate-12 transition-transform" />
              Send an Email
            </a>
            <a 
              href="https://linkedin.com/in/tasfia-ara/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-10 py-5 bg-white border border-zinc-200 text-zinc-900 rounded-2xl font-bold text-sm hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95 group"
            >
              <Linkedin size={18} />
              LinkedIn Profile
              <ExternalLink size={14} className="text-zinc-300" />
            </a>
          </div>
        </div>
      </section>

      <footer className="pt-24 pb-16 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-zinc-50">
        <div className="flex items-center gap-5">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-white mono font-bold text-sm shadow-xl">T</div>
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">Tasfia Ara</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-300 mono">Build v2025.2.0 // Toronto</div>
          </div>
        </div>
        <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mono">
          <a href="https://github.com/Tasfia-Ara" target="_blank" className="hover:text-indigo-600 transition-colors">GitHub</a>
          <a href="mailto:tasfia.ara@mail.utoronto.ca" className="hover:text-indigo-600 transition-colors">Mail</a>
        </div>
        <p className="mono text-[10px] text-zinc-200 font-bold uppercase tracking-widest">End_of_Transmission</p>
      </footer>
    </div>
  );
};

const App = () => {
  const [isExplored, setIsExplored] = useState(false);
  const explorationRef = useRef<HTMLDivElement>(null);

  const handleExplore = () => {
    setIsExplored(true);
    setTimeout(() => {
      explorationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen selection:bg-indigo-100 selection:text-indigo-900 bg-[#fdfcfb]">
      <Navbar isExplored={isExplored} />
      
      <main className="max-w-6xl mx-auto px-6">
        <div className="h-screen flex flex-col justify-center">
          <Hero onExplore={handleExplore} />
        </div>
        
        {isExplored && (
          <div ref={explorationRef}>
            <ExplorationView />
          </div>
        )}
      </main>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
