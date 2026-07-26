---
title: 'view_primitives'
description: '80+ shadcn/ui-inspired components for Rails, built on ViewComponent and copied straight into your app.'
github: 'https://github.com/alec-c4/view_primitives'
tags: ['Ruby on Rails', 'Frontend', 'Hotwire']
types: ['open-source']
order: 10
---

A [shadcn/ui](https://ui.shadcn.com)-inspired component library for Rails built on [ViewComponent](https://viewcomponent.org) — over 80 components, from buttons and forms to data tables, command palettes, and calendars.

> **Acknowledgements** — The visual design, CSS class choices, and component structure of ViewPrimitives are heavily inspired by [shadcn/ui](https://ui.shadcn.com) and its Svelte port [shadcn-svelte](https://www.shadcn-svelte.com).

Components are **copied into your app** via a generator — not imported from a package. Tailwind classes live in your own files, so any Tailwind setup works out of the box: `tailwindcss-rails`, `cssbundling-rails`, Vite, esbuild — no configuration required.

## Why ViewPrimitives?

- **You own the code** - Components land in `app/components/ui/` as plain Ruby and ERB files, editable like any other file in your app
- **Zero build config** - Tailwind 4 reads design tokens straight from CSS via `@theme inline` — no `tailwind.config.js` required
- **Broad coverage** - Primitives, forms, navigation, overlays, data display, and media components covering most of what a typical admin or marketing UI needs
- **Themeable** - Swap color themes or edit the OKLCH design tokens in one file
- **Selective installs** - Add and update components one at a time with a generator, instead of pulling in the whole library

## Example

```bash
rails g view_primitives:install
rails g view_primitives:add button alert
```

```erb
<%= ui :button, "Save changes", variant: :outline %>
<%= ui :alert, title: "Heads up!", description: "Check your settings." %>
```
