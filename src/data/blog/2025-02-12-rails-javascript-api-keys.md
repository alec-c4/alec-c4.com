---
author: Alexey Poimtsev
pubDatetime: 2025-02-12T11:41:29.000+03:00
title: "Tip: How to pass API keys to javascript in rails apps"
slug: 2025-02-12-rails-javascript-api-keys
featured: false
draft: false
tags:
  - ruby on rails
  - ruby
  - short tips and hacks
description: How to pass API keys to javascript code in rails applications
---

Sometimes, you might need to pass API keys from your Rails code to JavaScript. I’ve encountered this question on various platforms, and today, I’m sharing my expertise on how to write such code.

First and foremost, I want to emphasize that these keys will be accessible to anyone who has the knowledge to open developer tools in a browser. Therefore, I strongly advise against using secret keys in such situations. However, it’s perfectly acceptable to use public keys.

Imagine, we need to pass SuperPlatform public API key from ENV variable or from rails credentials. If you need to access this key from any page you can define meta-tag in your layout `app/views/layouts/application.html.erb` with

```erb
<%= tag.meta name: "superplatform-key", content: Rails.application.credentials.superplatform[:api_key] %>

# or

<%= tag.meta name: "superplatform-key", content: ENV.fetch("superplatform_api_key") %>
```

If you need to pass this variable from specific pages then you can define `yield` in your layout with

```erb
<%= yield :api_keys %>
```

and pass required keys using

```erb
<% content_for :api_keys do %>
  <%= tag.meta name: "superplatform-key", content: Rails.application.credentials.superplatform[:api_key] %>
<% end %>
```

Well, we got API keys in our view so we can access those keys from JavaScript code using

```javascript
const superplatform_key = document
  .querySelector("meta[name='superplatform-key']")
  .getAttribute("content");
console.log("superplatform_key", superplatform_key);
```

Voilà!
