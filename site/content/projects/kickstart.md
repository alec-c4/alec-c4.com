---
title: 'Kickstart'
description: 'Ruby on Rails application templates'
link: 'https://github.com/alec-c4/kickstart'
github: 'https://github.com/alec-c4/kickstart'
tags: ['Svelte', 'React', 'Vue', 'Inertia.js', 'Ruby on Rails']
types: ['open-source']
order: 1
---

It is a collection of application templates, scripts, and automatizations I use for everyday work. All included code is written with the following principles:

- Code is testable
- Code is written to be supported without a hassle
- Code is written, following best practices from developers and product communities

## Templates

### esbuild_tailwind

Modern Rails application with ESBuild bundling and Tailwind CSS.

**Frontend:**

- ESBuild + Tailwind CSS
- Turbo & Stimulus
- ViewComponent with Lookbook
- Better HTML & ERB Lint

**Backend:**

- PostgreSQL with UUID support
- Anyway Config for settings
- Active Interaction for service objects
- Active Decorator for presenters
- Pagy for pagination
- Shrine for file uploads
- Lockbox & Blind Index for encryption

**Development:**

- RSpec with parallel_tests support
- Rubocop, Brakeman
- Devcontainer ready
- I18n with i18n-tasks
- Custom error pages (404, 422, 406, 500)

**Deployment:**

- Kamal deployment ready
- Solid Queue, Cache, Cable

### importmap_tailwind

Rails application with Import Maps and Tailwind CSS.

**Frontend:**

- Import Maps + Tailwind CSS
- Turbo & Stimulus
- ViewComponent with Lookbook
- Better HTML & ERB Lint

**Backend & Deployment:**

- Same as esbuild_tailwind (see above)

### inertia_svelte

Modern SPA with Inertia.js and Svelte 5 for reactive interfaces.

**Frontend:**

- Vite + Tailwind CSS
- Inertia.js for SPA architecture
- Svelte 5 with runes and reactivity
- No Turbo/Stimulus (full SPA approach)

**Backend:**

- PostgreSQL with UUID support
- Anyway Config for settings
- Active Interaction for service objects
- Active Decorator for presenters
- Pagy for pagination
- Shrine for file uploads
- Lockbox & Blind Index for encryption

**Development:**

- RSpec with parallel_tests support
- Rubocop, Brakeman
- Devcontainer ready
- I18n with i18n-tasks
- Generators configured for Inertia (no JS/asset generation)

**Deployment:**

- Kamal deployment ready
- Solid Queue, Cache, Cable

### inertia_react

Modern SPA with Inertia.js and React for component-based UIs.

**Frontend:**

- Vite + Tailwind CSS
- Inertia.js for SPA architecture
- React with hooks and TypeScript
- No Turbo/Stimulus (full SPA approach)

**Backend & Development:**

- Same as inertia_svelte (see above)

### inertia_vue

Modern SPA with Inertia.js and Vue 3 for progressive interfaces.

**Frontend:**

- Vite + Tailwind CSS
- Inertia.js for SPA architecture
- Vue 3 Composition API with TypeScript
- No Turbo/Stimulus (full SPA approach)

**Backend & Development:**

- Same as inertia_svelte (see above)

### api

Rails API-only application for backend services.

**Backend:**

- PostgreSQL with UUID support
- Anyway Config for settings
- Active Interaction for service objects
- Pagy for pagination
- Shrine for file uploads
- Lockbox & Blind Index for encryption

**Development:**

- RSpec with parallel_tests support
- Rubocop, Brakeman
- I18n with i18n-tasks

**Deployment:**

- Kamal deployment ready
- Solid Queue, Cache, Cable
