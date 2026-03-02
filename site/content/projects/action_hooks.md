---
title: 'action_hooks'
description: 'Role management gem for Ruby on Rails'
github: 'https://github.com/alec-c4/action_hooks'
tags: ['Ruby on Rails', 'Webhooks']
types: ['open-source']
order: 9
---

ActionHooks is a Ruby on Rails engine designed to securely handle incoming webhooks. It standardizes the process of receiving webhooks from various third-party services (like Stripe, GitHub, etc.) by:

1. **Persisting Webhooks:** Saving all incoming requests to the database (`webhook_requests` table) with their payload, source, and processing state before any business logic is executed.
2. **Security & Verification:** Verifying the authenticity of the webhook via signature validation logic and optionally restricting access by IP address.
3. **Asynchronous Processing:** Automatically dispatching the saved webhook to a configured background worker (`ActiveJob`) for asynchronous processing.
