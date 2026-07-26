---
title: 'Roistat'
description: 'Ruby client for the Roistat marketing analytics REST API.'
github: 'https://github.com/alec-c4/roistat'
tags: ['API Client', 'Integrations', 'Ruby on Rails']
types: ['open-source']
order: 0
---

Roistat is a Ruby wrapper for the [Roistat REST API](https://help-ru.roistat.com/API/methods/about/), a marketing analytics and call-tracking platform. The gem authenticates every request with the `Api-key` header — never as a query parameter — and ships resource clients covering the full API surface, from calltracking and leads to analytics and billing.

## Why Roistat?

- **Full API coverage** - Projects, access, dashboards, widgets, billing, calltracking, orders, leads, managers, visits, events, analytics, channels, statistics, speech analytics, cloud PBX, and more
- **Rails-friendly configuration** - A global `Roistat.configure` block plus an install generator that scaffolds an initializer from environment variables
- **Explicit clients** - Spin up scoped clients per project or API key when the shared client isn't enough
- **Low-level escape hatch** - `get`/`post`/`request` helpers cover any documented endpoint that doesn't have a resource wrapper yet
- **Safe by default** - Blank or whitespace-only credentials raise `Roistat::ConfigurationError` before any HTTP call is made

## Example

```ruby
Roistat.configure do |config|
  config.api_key = ENV.fetch("ROISTAT_API_KEY")
  config.project = ENV.fetch("ROISTAT_PROJECT_ID")
end

Roistat.client.projects.list
Roistat.client.calltracking.phone_list
```
