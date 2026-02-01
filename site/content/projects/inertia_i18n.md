---
title: 'Inertia I18n'
description: 'Translation management for Inertia.js applications with Rails backend'
link: 'https://github.com/alec-c4/inertia_i18n'
github: 'https://github.com/alec-c4/inertia_i18n'
tags: ['Svelte', 'React', 'Vue', 'Inertia.js', 'Ruby on Rails']
types: ['open-source']
order: 4
---

## The Problem

Inertia.js applications have a split architecture:

- **Backend (Rails):** Uses YAML locale files (`config/locales/*.yml`)
- **Frontend (React/Svelte/Vue):** Uses i18next JSON files

This creates several challenges:

1. **Duplicate management:** Maintaining translations in two formats
2. **Sync issues:** Keys in YAML but missing in JSON (or vice versa)
3. **No usage tracking:** Unused translation keys accumulate
4. **Manual process:** Converting YAML → JSON by hand is error-prone

Existing tools like [i18n-tasks](https://github.com/glebm/i18n-tasks) only handle Rails/backend translations.

## The Solution

InertiaI18n provides:

- **YAML → JSON conversion** with interpolation mapping (`%{var}` → `{{var}}`)
- **AST-based scanning** to find translation usage in `.svelte`, `.tsx`, `.vue` files
- **Health checks** to detect missing, unused, and unsynchronized keys
- **Watch mode** for automatic regeneration during development
- **Rails integration** via initializers and rake tasks

**One source of truth:** Rails YAML files, with JSON auto-generated.
