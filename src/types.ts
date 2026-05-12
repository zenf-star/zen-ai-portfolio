export type ProjectCategory = 'Automation' | 'Frontend' | 'Community';

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  tag: string;
  oneLiner: string;
  description: string;
  keyFeatures: string[];
  demoUrl: string;
  posterUrl?: string;
  year: string;
  readme?: string;
  github?: string;
}
