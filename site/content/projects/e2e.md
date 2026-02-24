---
title: 'e2e'
description: 'Unified, high-performance E2E testing framework for Ruby.'
github: 'https://github.com/alec-c4/e2e'
tags: ['e2e', 'testing', 'Ruby on Rails']
types: ['open-source']
order: 6
---

**Unified, high-performance E2E testing framework for Ruby.**

`e2e` is a modern wrapper around **Playwright**, designed to bring the elegance of Capybara and the speed of raw browser automation together.

## Why E2E?

- **⚡️ Blazing Fast:** Uses direct IPC (Pipes) to communicate with the browser, avoiding HTTP overhead.
- **🧩 Plug & Play:** Zero configuration for most Rails apps. Includes a generator.
- **💎 Clean DSL:** Idiomatic Ruby API (`click_button`, `find`, `visit`) that feels like home.
- **🚀 Modern Engine:** Powered by Microsoft Playwright (WebKit, Firefox, Chromium).
- **🛠 Escape Hatch:** Direct access to the `native` Playwright object for **any** complex scenario.
- **🔄 Shared Connection:** Built-in support for sharing DB connections between test and app threads (transactional tests support).
- **👮‍♀️ Lint Friendly:** Includes auto-configuration for RuboCop to respect E2E testing patterns.
