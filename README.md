# Spaceship 🚀

**Spaceship** is a high-performance, premium blog and portfolio template built with **Astro 5**, **Svelte 5 Runes**, and **Tailwind CSS 4**. It is designed for developers and designers who want a modern, ultra-fast, and SEO-optimized web experience.

## ✨ Features

- **🚀 High Performance**: Built with Astro for lightning-fast speeds and minimal JavaScript.
- **⚡ Optimizations**:
  - **Partytown**: Google Analytics is offloaded to web workers.
  - **Loading Indicator**: Smooth progress bar for better navigation UX.
- **🎨 Modern Design**: Clean aesthetics with dark mode support and fluid typography.
- **Svelte 5 Runes**: Leveraging the latest Svelte reactivity system (`$state`, `$derived`, `$props`).
- **Tailwind CSS 4**: Next-gen CSS framework for high performance and zero-runtime.
- **📝 Interactive Blog**:
  - **MDX Support**: Embed Svelte components directly in your posts.
  - **Series Support**: Group related posts into a series with automatic navigation.
  - **Draft Mode**: Hide draft posts in production, visible in development.
  - **Publication Date Filtering**: Schedule posts with future dates.
  - **Customizable CTA**: Add call-to-action blocks at the end of posts.
  - **Per-Post Controls**: Toggle CTA and comments individually per post.
- **💬 Comments System**:
  - **GitHub Discussions**: Powered by Giscus for privacy-friendly comments.
  - **Fully Customizable**: Configure theme, language, and behavior.
  - **Per-Post Toggle**: Enable/disable comments on individual posts.
- **🔍 Advanced Search**: Fast, client-side search across all post titles and descriptions.
- **📊 Robust SEO**:
  - **JSON-LD Support**: Automatic structured data for WebSite, BlogPosting, Person, and Breadcrumbs.
  - **Canonical URLs**: Built-in support for canonical links and robots meta tags.
  - **Dynamic OG Images**: Automatically generated social preview images for every post.
  - **RSS Feed & Sitemap**: Ready-to-use RSS and sitemap generation.
- **✍️ Enhanced Markdown**:
  - **Shiki Syntax Highlighting**: Includes line highlights, diffs, and word highlighting.
  - **Auto-generated TOC**: Interactive table of contents with scroll spying.
  - **Heading Anchor Links**: Clickable links for sharing specific sections.
  - **Mermaid Diagrams**: Support for flowcharts and diagrams directly in markdown.
  - **Emoji Support**: Native emoji shortcodes (`:rocket:`, etc.).
  - **Multi-language Support**: Link posts to their translated versions (e.g. English <-> Russian) with automatic flag indicators.
- **🧹 Modular Architecture**: Well-organized components and content collections.

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
- **UI Components**: [Svelte 5](https://svelte.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Content**: Markdown & MDX
- **Optimization**: Sharp, Shiki, Partytown
- **Icons**: Lucide & custom SVGs

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [pnpm](https://pnpm.io/) (This project is configured for pnpm)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alec-c4/spaceship.git
   cd spaceship
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

## 📂 Project Structure

Spaceship uses an **"Updatable Content"** architecture. All your personal data is separated from the core template code, allowing you to update the engine easily.

```text
/
├── site/              # 🟢 YOUR DATA (Keep this!)
│   ├── assets/        # Your personal images (favicon, profile)
│   ├── content/       # Your posts, projects, and bio
│   └── config.ts      # Your site configuration
├── src/               # ⚙️ Core Engine (Updateable)
│   ├── components/    # UI components
│   ├── layouts/       # Page templates
│   ├── lib/           # Logic and utilities
│   └── pages/         # Routes
├── public/            # Static files
├── astro.config.mjs   # Astro settings
└── package.json
```

## 📖 Content Management

### ✍️ Adding Content

Manage your content in `site/content/`.

- **Posts**: `site/content/posts/`
- **Projects**: `site/content/projects/`
- **About**: `site/content/about/index.md` (Your CV/Bio)

### 📝 Creating Content

Spaceship includes tools to make content creation faster:

- **VS Code Snippets**: Open any markdown file and type `post`, `project`, or `appearance` then press **Tab** to generate the frontmatter automatically.
- **Templates**: Reference files named `_template.md` are available in each content folder as examples.
- **Dev Container**: A pre-configured development environment is included (`.devcontainer/`) with all necessary extensions and tools.

### 🔧 Configuration

All site-wide settings are in `site/config.ts`:

```typescript
export const SITE = {
  author: 'Your Name',
  title: 'Your Blog',
  desc: 'Your description',
  website: 'https://yourdomain.com',

  // Homepage configuration
  featuredPostsCount: 1, // Number of featured posts to show
  latestPostsCount: 3, // Number of latest posts to show

  // CTA block configuration
  cta: {
    enabled: true,
    filePath: 'site/cta.md', // Markdown file with CTA content
  },

  // Comments configuration (GitHub Discussions via Giscus)
  comments: {
    enabled: false, // Set to true after configuring
    repo: 'username/repo',
    repoId: '', // Get from https://giscus.app
    categoryId: '', // Get from https://giscus.app
    // ... more options
  },

  // Analytics
  googleAnalyticsId: 'G-XXXXXXXXXX', // Offloaded via Partytown
};
```

## 📚 Documentation

Comprehensive guides are available as blog posts in your installation:

- **[How to Publish Posts](docs/how-to-publish-posts.md)** - Complete guide to creating posts, frontmatter options, images, and advanced features
- **[Configuring Spaceship](docs/configuring-spaceship.md)** - All configuration options, deployment, and customization

### Quick Links

- **Creating Posts**: `site/content/posts/your-post.md`
- **Adding Projects**: `site/content/projects/your-project.md`
- **Customizing CTA**: Edit `site/cta.md`
- **Configuring Comments**: Get settings from [giscus.app](https://giscus.app)
- **Analytics**: Add your GA4 ID to `site/config.ts`

## ☁️ Deployment

Spaceship is a static site by default (SSG), but can be easily converted to SSR using Astro Adapters.

### Static Hosting (Recommended)

You can deploy to **Vercel**, **Netlify**, **Cloudflare Pages**, or **GitHub Pages** without any extra configuration. Just push your code.

### SSR & Advanced Features

If you need dynamic features, install the appropriate adapter:

- **Vercel**: `pnpm astro add vercel`
- **Netlify**: `pnpm astro add netlify`
- **Cloudflare**: `pnpm astro add cloudflare`
- **Node.js**: `pnpm astro add node` (For VPS/Docker)

More details: [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/)

## � Updating

Spaceship is designed with a "core vs content" separation. This makes updating to new versions straightforward:

1. **Keep your `site/` folder**: This contains all your posts, projects, assets, and configuration.
2. **Download the latest version** of Spaceship.
3. **Replace the core files** in your project with the new ones:
   - `src/` (The engine)
   - `public/` (Static assets shell)
   - `astro.config.mjs` (Main configuration)
   - `package.json` & `pnpm-lock.yaml` (Dependencies)
   - `tsconfig.json` (Tooling config)
4. **Run `pnpm install`** to update dependencies.
5. **Verify**: Your content in `site/` will automatically be picked up by the new engine.

## �📜 License

MIT License © [Alexey Poimtsev](https://github.com/alec-c4)
