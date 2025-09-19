---
author: Alexey Poimtsev
pubDatetime: 2025-09-19T21:17:55.000+03:00
title: Kickstart is back
featured: false
draft: false
tags:
  - ruby on rails
  - ruby
  - development automation
description: What's new in Kickstart 1.0
---

Several years ago I created an opinionated set of Ruby on Rails application templates called **Kickstart**. The project went inactive for some time, but a week ago I decided to rebuild it from the ground up. I’m excited to share that a new version is now in active development, with more features on the way.

👉 [Kickstart repository](https://github.com/alec-c4/kickstart)

### What’s new so far

- Updated for Rails 8.1
- Added a shell script for interactively selecting templates
- All templates now live in one repo (no more git submodules)
- Shared code across templates
- Three templates currently in progress: REST API, minimal (importmaps + Tailwind), esbuild + Tailwind
- Basic setup included: RSpec tests, RuboCop + StandardRB linters, and common gems (Solid Stack, Mission Control, Letter Opener, i18n tools, etc.)

### What’s planned next

- Database encryption with **Lockbox** (more feature-rich than ActiveRecordEncryption)
- Custom generators for authentication (passwordless, login/password, and Google/Apple), with disposable email protection and [haveibeenpwned](https://haveibeenpwned.com) integration
- [Custom error pages](https://alec-c4.com/posts/2022-10-04-rails-custom-error-pages)
- [Deployment configs for Kamal](https://alec-c4.com/posts/2025-04-02-kamal)
- [Scaffold templates](https://alec-c4.com/posts/2022-11-25-rails-scaffold-templates)
- Admin console
- BI with Blazer, Ahoy, and Searchjoy
- End-to-end tests
- New templates: Inertia with Svelte and React, GraphQL API
- And more coming soon

### Current challenges

- Avoiding dotenv files and lengthy setup instructions. The goal is to ship preconfigured credentials for development and test environments.
- Designing custom generators that let developers choose their authentication strategy: passwordless (preferred), login/password with `bcrypt`, or social login with `omniauth`.

If you find the project useful, feel free to star the repo and share your feedback. Ideas and suggestions are always welcome.
