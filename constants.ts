import { Project, Experience, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'gitwispr',
    title: 'GitWispr',
    description: 'An AI-powered application that summarizes open-source codebases into digestible audio and text insights. Focuses on high-concurrency backend processing.',
    tech: ['LLMs', 'Node.js', 'React', 'Voice AI'],
    github: 'https://github.com/Tasfia-Ara/gitwispr',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1000&auto=format&fit=crop',
    category: 'Full-stack'
  },
  {
    id: 'respiracheck',
    title: 'Respiracheck',
    description: 'A deep learning project using CNNs to detect COVID-19 from respiratory cough data. Optimized ResNet architectures to enhance accuracy by 20%. Published in CUCAI 2025.',
    tech: ['Python', 'ResNet', 'TensorFlow', 'Research'],
    github: 'https://github.com/Tasfia-Ara',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    category: 'AI/ML'
  },
  {
    id: 'ai-cs-mentor',
    title: 'AI-CS Mentor',
    description: 'Advanced Generative AI application built during Headstarter Fellowship. Built with React, Node.js, and OpenAI GPT-4o. Deployed on AWS EC2 with 1,000+ users.',
    tech: ['React', 'Node.js', 'OpenAI API', 'AWS EC2'],
    github: 'https://github.com/Tasfia-Ara',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
    category: 'Full-stack'
  },
  {
    id: 'pantry-tracker',
    title: 'PantryTracker',
    description: 'An inventory management application built with Next.js, Tailwind CSS, Firebase and Material UI. Deployed on Vercel for fast CI/CD.',
    tech: ['Next.js', 'Firebase', 'Tailwind CSS', 'Material UI'],
    github: 'https://github.com/Tasfia-Ara',
    image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=1000&auto=format&fit=crop',
    category: 'Full-stack'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'anthropic',
    company: 'Anthropic',
    role: 'Claude Builder Club Leader',
    period: 'Aug 2025 — Present',
    description: [
      'Leading the launch of UofT’s first Claude Builder Club in collaboration with Anthropic.',
      'Organizing workshops and hackathons for a community of 300+ students.',
      'Fostering a student community centered around AI/ML innovation and ethical scaling.'
    ],
    logo: 'A'
  },
  {
    id: 'mit-rai',
    company: 'MIT RAISE',
    role: 'Fullstack App Development Mentor',
    period: 'Jun 2025 — Aug 2025',
    description: [
      'Taught full-stack and ML concepts to students for the FutureMakers program.',
      'Covered API integration (OpenAI/DALL-E), databases, and backend processing.',
      'Mentored students on building real-world AI applications.'
    ],
    logo: 'M'
  },
  {
    id: 'microsoft',
    company: 'Microsoft',
    role: 'Software Engineering (SWE) Intern',
    period: 'May 2025 — Jun 2025',
    description: [
      'Accepted into the Microsoft Copilot team in Redmond.',
      'Note: Internship was cancelled due to visa issues and headcount restrictions.',
      'Demonstrated high technical competence during a rigorous selection process.'
    ],
    logo: '田'
  },
  {
    id: 'utmist',
    company: 'UTMIST',
    role: 'Machine Learning Engineer',
    period: 'Feb 2025 — Apr 2025',
    description: [
      'Led CNN model development using ResNet, optimizing dropout rates to enhance accuracy by 20%.',
      'Published research findings at CUCAI 2025 Conference.',
      'Aligned project OKRs with performance-driven AI innovation and system accuracy.'
    ],
    logo: '🧠'
  },
  {
    id: 'headstarter',
    company: 'Headstarter',
    role: 'Software Engineering Intern',
    period: 'Jul 2024 — Sep 2024',
    description: [
      'Built and deployed 5 AI projects in 7 weeks, reaching 1,000+ users.',
      'Integrated Stripe API for revenue generation in AI Flashcard application.',
      'Deployed scalable apps using AWS EC2, ReactJS, and Node.js.'
    ],
    logo: '🚀'
  }
];

export const SKILLS: Skill[] = [
  {
    category: 'Backend',
    items: ['Node.js', 'TypeScript', 'Java', 'SQL', 'FastAPI', 'AWS']
  },
  {
    category: 'ML Engineering',
    items: ['TensorFlow', 'Python', 'LLMs', 'CNNs', 'Applied Statistics']
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Material UI', 'Vercel']
  }
];

export const RESUME_CONTENT = `
Tasfia Ara is a 3rd-year CS and Stats student at UofT, specializing in Machine Learning and Backend Systems.
Current Focus: Building GitWispr (github.com/Tasfia-Ara/gitwispr), an app summarizing open-source code for mobile learning.
Key Leadership: Leader of UofT's first Claude Builder Club in collaboration with Anthropic.
Achievements: Improved CNN accuracy by 20% for performance-critical systems; Research published at CUCAI 2025.
Experience: Mentor at MIT RAI; ML Engineer at UTMIST; SWE Fellow at Headstarter; Prev accepted SWE Intern at Microsoft Copilot team.
Seeking: Summer 2026 SWE Internships in Fintech, AI infrastructure, and Backend development.
Contact: tasfia.ara@mail.utoronto.ca
`;
