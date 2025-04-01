---
author: Alexey Poimtsev
pubDatetime: 2025-03-10T12:10:57.000+03:00
modDatetime:
title: "Mastering Ruby on Rails templates"
slug: draft-rails-templates
featured: false
draft: true
tags:
  - ruby on rails
  - ruby
  - development automation
description: How to create and use your own ruby on rails application templates
---

One of my favorite features of the Ruby on Rails framework is ability to create and use application templates. Several years ago I've created my own template named [kickstart](https://github.com/alec-c4/kickstart), but because I haven't updated it for a while I've decided to create new version from scratch and I'll show you how to do it. Let's do it!

If you never used templates for rails apps - let me explain how it works. You can create rails app with some predefined features using `-m` key.

```sh
rails new super_app -m https://raw.githubusercontent.com/alec-c4/kickstart/master/template.rb
```

This will use scenarios described in `template.rb` to install required deps, copy files, run shell commands etc.

## Planning

Well, lets describe what we need from our template:

- custom `README.md`
- `.gitignore` file with all stuff we want to avoid in our repo
- [custom error pages](/posts/2022-10-04-rails-custom-error-pages)
- [custom scaffold templates](/posts/2022-11-25-rails-scaffold-templates)
- pre-configured generators
- landing, terms of service, privacy policy and about pages
- i18n files with our favorite locales
- I18n tools - [rails-i18n](http://github.com/svenfuchs/rails-i18n) and [i18n-tasks](https://github.com/glebm/i18n-tasks)
- postgresql database connector (because PostgreSQL is suitable for the most projects) with all required extensions
- linters - [rubosop](https://github.com/rubocop/rubocop) + [standard](https://github.com/standardrb/standard) for ruby code
- linters for erb files - [better-html](https://github.com/Shopify/better-html) and [erb-lint](https://github.com/Shopify/erb-lint)
- [standard.js](https://standardjs.com/) as a javascript linter
- [pry-rails](https://github.com/rweng/pry-rails) and [amazing_print](https://github.com/amazing-print/amazing_print) for better rails console
- [semantic_logger](https://github.com/reidmorrison/semantic_logger) as a highly configurable logging system
- [rspec](https://rspec.info/), [factory_bot](https://github.com/thoughtbot/factory_bot), [ffaker](https://github.com/ffaker/ffaker), [shoulda](https://github.com/thoughtbot/shoulda), [capybara](https://teamcapybara.github.io/capybara/), [email_spec](https://github.com/email-spec/email-spec) and [cypress](https://www.cypress.io/) for testing
- [simplecov](https://github.com/simplecov-ruby/simplecov) for test coverage research
- solid stack + mission control
- authentication using bcrypt
- authorization with [pundit](https://github.com/varvet/pundit) + [pundit-matchers](https://github.com/chrisalley/pundit-matchers) for tests
- role management system
- pre-configured generators
- ability to ban user account
- SEO tools - [meta-tags](https://github.com/kpumuk/meta-tags), [sitemap_generator](http://github.com/kjvarga/sitemap_generator) and [friendly_id](https://github.com/norman/friendly_id)
- Admin console with dashboard and user management

Well, now we know what we will do, lets start our work. But wait - there are one more important think we've forgot.

As you maybe know - there are a lot of possible configurations for rails apps:

- different databases (but earlier I wrote that I'll use PostgreSQL)
- different test frameworks (but I'll use rspec)
- solid stack - yes/no
- hotwire - true/false
- devcontainers - +/-
- api vs fullstack
- javascript - importmap/esbuild/vite/webpacker/etc
- css - tailwind/bootstrap/bulma/sass

It is too complicated and a bit stupid to support all of them, morethen, because of your personal preferences or company requirements, you'll use ona or maybe two configurations, so let's choose what we will use. I'd like to propose following configuration:

- PostgreSQL
- rspec
- solid stack
- hotwire
- fullstack app with tailwind and esbuild

Looks good enough, isn't it? No more words - let's code!

## Development

Now, I'll create repo and some useful files

```sh
mkdir kickstart && cd kickstart && git init
```

- .gitignore
- Gemfile
- flowbite?
- uuid
- rubocop + standard + erb_lint
- .editorconfig
- mise.toml
- .github/ISSUE_TEMPLATE
- rails g rspec:install
- rspec replace files
- config.generators.apply_rubocop_autocorrect_after_generate!
- helpers
- components
- `cp $(i18n-tasks gem-path)/templates/config/i18n-tasks.yml config/`
- `cp $(i18n-tasks gem-path)/templates/rspec/i18n_spec.rb spec/`
- locales
- initializers
- settings.yml
- layouts
- rails g controller pages home terms privacy
- lefthook
- bin/rails mission_control:jobs:authentication:configure
