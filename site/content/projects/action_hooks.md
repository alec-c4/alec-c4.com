---
title: 'action_hooks'
description: 'Ruby on Rails engine for securely receiving, verifying, and processing incoming webhooks.'
github: 'https://github.com/alec-c4/action_hooks'
tags: ['Ruby on Rails', 'Webhooks']
types: ['open-source']
order: 9
---

ActionHooks is a Ruby on Rails engine designed to securely handle incoming webhooks. It standardizes the process of receiving webhooks from various third-party services (like Stripe, GitHub, etc.) by:

1. **Persisting Webhooks** - Saving all incoming requests to the database (`webhook_requests` table) with their payload, source, and processing state before any business logic is executed
2. **Security & Verification** - Verifying the authenticity of the webhook via signature validation logic and optionally restricting access by IP address
3. **Asynchronous Processing** - Automatically dispatching the saved webhook to a configured background worker (`ActiveJob`) for asynchronous processing

## Example

```ruby
# config/initializers/action_hooks.rb
ActionHooks.configure do |config|
  config.add_source(:stripe) do |source|
    source.worker = "StripeWebhookJob"
    source.verify_signature = ->(request) { Stripe::Webhook::Signature.verify_header(...) }
  end
end
```

```ruby
# app/jobs/stripe_webhook_job.rb
class StripeWebhookJob < ApplicationJob
  def perform(webhook_request_id)
    webhook_request = ActionHooks::WebhookRequest.find(webhook_request_id)
    # handle webhook_request.payload
    webhook_request.processed!
  end
end
```
