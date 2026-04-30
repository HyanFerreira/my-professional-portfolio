export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
};
