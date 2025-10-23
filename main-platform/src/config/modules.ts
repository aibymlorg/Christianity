export interface ModuleConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  url: string;
  icon: string;
  path: string;
  color: string;
  roles: string[];
  features: string[];
  targetAudience: string;
}

export const modules: ModuleConfig[] = [
  {
    id: 'culture',
    name: 'Culture',
    displayName: 'Christian Culture Explorer',
    description: 'Explore the rich tapestry of Christian culture through our senses to experience in person',
    url: import.meta.env.VITE_CULTURE_MODULE_URL || 'http://localhost:5174',
    icon: '🌅',
    path: 'https://ai-christianity-culture.vercel.app/',
    color: 'culture',
    roles: ['guest', 'seeker', 'believer', 'student', 'scholar', 'admin'],
    features: [
      'Eat (Cultural Approach)',
      'Walk',
      'Listen',
      'See',
      'Read',
      'Think',
    ],
    targetAudience: 'Seekers',
  },
  {
    id: 'christianity',
    name: 'AIChristianity',
    displayName: 'Christian Theology & Research',
    description: 'Advanced theological research platform with 11 LLM models for scholarly work',
    url: import.meta.env.VITE_CHRISTIANITY_MODULE_URL || 'http://localhost:5175',
    icon: '🎓',
    path: 'https://ai-christianity-platform.vercel.app/',
    color: 'christianity',
    roles: ['believer', 'student', 'scholar', 'admin'],
    features: [
      'Bible Research (Academic)',
      'Theology Assistant',
      'Document Analysis',
      'Assignment Helper',
      'Theologian Journal',
    ],
    targetAudience: 'Scholars',
  },
  {
    id: 'bible-know',
    name: 'AIBibleKnow',
    displayName: 'Bible Knowledge & Learning',
    description: 'Interactive Bible learning with Hebrew & Greek language mastery',
    url: import.meta.env.VITE_BIBLE_KNOW_MODULE_URL || 'http://localhost:5176',
    icon: '📖',
    path: 'https://ai-sunday-school.vercel.app/',
    color: 'bibleKnow',
    roles: ['believer', 'student', 'admin'],
    features: [
      'Interactive Bible Quests',
      'Hebrew Learning',
      'Greek Learning',
      'AI Pronunciation',
      'Prepare Bible Study',
    ],
    targetAudience: 'Students',
  },
  {
    id: 'church-admin',
    name: 'AIChurchAdmin',
    displayName: 'Church Administration & Ministry',
    description: 'Comprehensive church management with sermon generation and attendance tracking',
    url: import.meta.env.VITE_CHURCH_ADMIN_MODULE_URL || 'http://localhost:5177',
    icon: '⚙️',
    path: 'https://ai-admin-sunday-school.vercel.app/',
    color: 'churchAdmin',
    roles: ['admin', 'pastor', 'church-admin'],
    features: [
      'AI Sermon Generator',
      'Roll Call System',
      'Class Management',
      'Lesson Planning',
      'Participants Review',
    ],
    targetAudience: 'Leaders',
  },
];

export const getModuleById = (id: string): ModuleConfig | undefined => {
  return modules.find((m) => m.id === id);
};

export const getModulesByRole = (role: string): ModuleConfig[] => {
  return modules.filter((m) => m.roles.includes(role));
};
