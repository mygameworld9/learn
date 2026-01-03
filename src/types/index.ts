export interface Project {
  slug: string;
  title: string;
  date: string;
  category: string;
  techStack: string[];
  description: string;
  coverImage: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  content: string;
}

export interface LearningCard {
  id: string;
  topic: string;
  category: string;
  icon: string;
  summary: string;
  details: string[];
  link?: string;
  date: string;
  content?: string;
}

export type ProjectCategory =
  | 'Web App'
  | 'Game'
  | 'AI/ML'
  | 'Automation'
  | 'Tool'
  | 'Other';

export type LearningCategory =
  | 'DevOps'
  | 'AI/Agent'
  | 'Backend'
  | 'Frontend'
  | 'Other';
