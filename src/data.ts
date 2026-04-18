// ============================================
// PORTFOLIO DATA — Update with your real info
// ============================================

export const PERSONAL = {
  name: 'Shubham Pathak',
  title: 'Full-Stack Engineer',
  taglines: [
    'Full-Stack Engineer',
    'AI Builder',
    'React Specialist',
    'Node.js Developer',
    'LangChain Explorer',
  ],
  location: 'Mumbai, India',
  email: 'sam76870@gmail.com',
  linkedin: 'https://linkedin.com/in/shubhampathak-71495b166',
  github: 'https://github.com/sam76870',
  resumeUrl: '/Shubham_Pathak_Resume_2026.pdf',
  resumeDownloadName: 'Shubham_Pathak_Resume_2026.pdf',
  photoUrl: '/photo.jpg',                  // ← Add your photo to /public folder
  bio: [
    "I'm a Senior Solution Engineer at Deqode, embedded as a consultant at Fynd — building the Jio Commerce Platform that powers AJIO, TIRA, and NetMeds at scale.",
    "With 4.5+ years of full-stack expertise across the MERN stack, I bridge engineering excellence with AI tooling. I integrate Cursor, Claude, and ChatGPT into my daily workflow to ship faster, smarter.",
    "Currently transitioning into AI Engineering — building RAG pipelines, LLM applications, and exploring LangChain, ChromaDB, and the Anthropic API as my next frontier.",
  ],
  currentRole: 'Senior Solution Engineer @ Deqode · Fynd',
} as const;

export const SKILLS = [
  {
    category: 'Frontend',
    icon: '⚡',
    items: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Angular', 'Tailwind CSS', 'Redux'],
  },
  {
    category: 'Backend',
    icon: '🔧',
    items: ['Node.js', 'Express.js', 'Python', 'Django', 'Flask', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Database',
    icon: '🗄️',
    items: ['MongoDB', 'PostgreSQL', 'InfluxDB', 'Redis', 'MySQL'],
  },
  {
    category: 'AI / ML',
    icon: '🤖',
    items: ['LangChain', 'ChromaDB', 'RAG', 'Claude API', 'OpenAI API', 'Vector DBs'],
  },
  {
    category: 'DevOps & Tools',
    icon: '🛠️',
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Cursor AI', 'Jira', 'Postman'],
  },
  {
    category: 'Real-time & IoT',
    icon: '📡',
    items: ['MQTT', 'WebSockets', 'InfluxDB', 'Real-time Dashboards'],
  },
] as const;

export const PROJECTS = [
  {
    id: 1,
    title: 'Jio Commerce Platform (JCP)',
    subtitle: 'Enterprise Commerce Engine',
    description:
      'Full-stack commerce platform serving millions of users across Reliance\'s top retail brands — AJIO, TIRA, and NetMeds. Built scalable React micro-frontends, REST APIs, and real-time inventory systems.',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Microservices'],
    clients: ['AJIO', 'TIRA', 'NetMeds'],
    impact: 'Millions of daily active users',
    gradient: 'linear-gradient(135deg, #00d4ff22, #7b2ff722)',
    accent: '#00d4ff',
    link: '#',
    github: null,
    featured: true,
  },
  {
    id: 2,
    title: 'AI-Powered Jira → PR Pipeline',
    subtitle: 'Dev Workflow Automation',
    description:
      'Built an LLM-orchestrated pipeline that reads Jira tickets and auto-generates pull request descriptions, test plans, and code review checklists — reducing ticket-to-PR time by 60%.',
    tags: ['Cursor AI', 'Claude API', 'ChatGPT', 'Node.js', 'GitHub API'],
    clients: [],
    impact: '60% reduction in ticket-to-PR time',
    gradient: 'linear-gradient(135deg, #7b2ff722, #00ff8822)',
    accent: '#7b2ff7',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'RAG PDF Q&A Chatbot',
    subtitle: 'AI Engineering · In Progress',
    description:
      'Document-aware chatbot using Retrieval-Augmented Generation. Upload any PDF and ask questions — powered by LangChain, ChromaDB vector store, FastAPI backend, and Anthropic Claude API.',
    tags: ['LangChain', 'ChromaDB', 'FastAPI', 'React', 'Claude API'],
    clients: [],
    impact: 'AI Engineering flagship project',
    gradient: 'linear-gradient(135deg, #00ff8822, #00d4ff22)',
    accent: '#00ff88',
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'DAKSHIIOT Real-Time Dashboard',
    subtitle: 'Industrial IoT · AVL India',
    description:
      'Real-time industrial monitoring dashboard with live telemetry, anomaly alerts, and time-series analytics. Handled MQTT streams, InfluxDB storage, and high-frequency sensor data visualization.',
    tags: ['MQTT', 'InfluxDB', 'PostgreSQL', 'React', 'WebSockets'],
    clients: ['AVL India'],
    impact: 'Real-time monitoring at scale',
    gradient: 'linear-gradient(135deg, #ff6b6b22, #ffa50022)',
    accent: '#ff6b6b',
    link: '#',
    github: null,
    featured: false,
  },
] as const;

export const EXPERIENCE = [
  {
    role: 'Senior Solution Engineer',
    company: 'Deqode (Consultant @ Fynd)',
    period: '2022 – Present',
    location: 'Mumbai, India',
    type: 'Full-time',
    highlights: [
      'Embedded consultant building the Jio Commerce Platform (JCP) for Reliance Retail',
      'Led frontend architecture for AJIO, TIRA, and NetMeds storefronts using React + TypeScript',
      'Built automated Jira → PR pipeline with LLM orchestration — cut ticket-to-PR time by 60%',
      'Collaborated with cross-functional teams across product, design, and backend engineering',
      'Integrated AI tools (Cursor, Claude) into daily dev workflow — shipped 40% faster',
    ],
    accent: '#00d4ff',
  },
  {
    role: 'Full-Stack Developer',
    company: 'AVL India',
    period: '2020 – 2022',
    location: 'Pune, India',
    type: 'Full-time',
    highlights: [
      'Built DAKSHIIOT — a real-time industrial IoT monitoring dashboard',
      'Integrated MQTT streams with InfluxDB for high-frequency time-series sensor data',
      'Designed PostgreSQL schemas and REST APIs for telemetry data management',
      'Created responsive React dashboards with real-time chart updates',
    ],
    accent: '#7b2ff7',
  },
] as const;

// EmailJS config — sign up at emailjs.com and replace these
export const EMAILJS_CONFIG = {
  serviceId: 'service_s46af8i',     // e.g. service_xxxxxx
  templateId: 'template_hddbvke',   // e.g. template_xxxxxx
  publicKey: 'A9agFkRg0PSo1KIkd',     // e.g. XXXXXXXXXXXXXXXXX
} as const;
