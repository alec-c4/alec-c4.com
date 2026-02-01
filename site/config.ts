export interface SiteConfig {
  author: string;
  desc: string;
  title: string;
  ogImage: string;
  lang: string;
  base: string;
  website: string;
  social: Record<string, string>;
  googleAnalyticsId?: string;
  homeHeroDescription: string;
  blogDescription: string;
  projectsDescription: string;

  // Homepage post counts
  featuredPostsCount: number;
  latestPostsCount: number;

  // Homepage projects
  homeProjects: {
    enabled: boolean;
    count: number;
  };

  // CTA (Call-to-Action) block for blog posts
  cta: {
    enabled: boolean;
    filePath: string; // Path to markdown file with CTA content
  };

  // Homepage Hero block
  hero: {
    enabled: boolean;
    filePath: string;
  };

  // Giscus comments configuration
  comments: {
    enabled: boolean;
    repo: string; // e.g., 'username/repo'
    repoId: string;
    category: string;
    categoryId: string;
    mapping: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
    reactionsEnabled: boolean;
    emitMetadata: boolean;
    inputPosition: 'top' | 'bottom';
    theme: string; // e.g., 'preferred_color_scheme', 'light', 'dark'
    lang: string;
  };
}

export const SITE: SiteConfig = {
  author: 'Alexey Poimtsev',
  desc: 'Alexey Poimtsev, geek, digital punk, entrepreneur.',
  title: "I'm Mary Poppins, y'all!",
  ogImage: 'og.png',
  lang: 'en',
  base: '/',
  website: 'https://alec-c4.com/',
  social: {
    github: 'https://github.com/alec-c4',
    x: 'https://x.com/alec_c4',
    telegram: 'https://t.me/alec_c4',
    email: 'mailto:alec@alec-c4.com',
  },
  googleAnalyticsId: 'GTM-W3HM787',
  homeHeroDescription:
    'Building premium web experiences with Astro, Svelte, and Tailwind. Focused on performance, aesthetics, and clean code. I am currently working on open-source tools and sharing my journey through writing.',
  blogDescription: 'Articles about Ruby on Rails, web development, and tech insights.',
  projectsDescription: "Things I've built that I'm proud of. Many of them are open-source.",

  // Homepage post counts
  featuredPostsCount: 3,
  latestPostsCount: 3,

  // Homepage projects
  homeProjects: {
    enabled: true,
    count: 4,
  },

  // CTA (Call-to-Action) block for blog posts
  cta: {
    enabled: true,
    filePath: 'site/cta.md',
  },

  hero: {
    enabled: true,
    filePath: 'site/hero.md',
  },

  // Giscus comments configuration
  comments: {
    enabled: true,
    repo: 'alec-c4/alec-c4.com',
    repoId: 'R_kgDOJj7Xew',
    category: 'General',
    categoryId: 'DIC_kwDOJj7Xe84CmTPj',
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'bottom',
    theme: 'preferred_color_scheme',
    lang: 'en',
  },
};
