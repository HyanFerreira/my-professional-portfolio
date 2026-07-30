export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectRepository = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  image?: string;
  gallery?: ProjectImage[];
  notice?: string;
  eventUrl?: string;
  repositories?: ProjectRepository[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
};
