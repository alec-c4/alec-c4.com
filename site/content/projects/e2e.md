---
title: 'e2e'
description: 'High-performance Ruby E2E testing framework combining Capybara-style ergonomics with Playwright speed.'
github: 'https://github.com/alec-c4/e2e'
tags: ['E2E', 'Testing', 'Ruby on Rails']
types: ['open-source']
order: 6
---

`e2e` is a modern wrapper around **Playwright**, designed to bring the elegance of Capybara and the speed of raw browser automation together.

## Why E2E?

- **Blazing Fast** - Uses direct IPC (pipes) to communicate with the browser, avoiding HTTP overhead
- **Plug & Play** - Zero configuration for most Rails apps, with a built-in generator
- **Clean DSL** - Idiomatic Ruby API (`click_button`, `find`, `visit`) that feels like home
- **Modern Engine** - Powered by Microsoft Playwright (WebKit, Firefox, Chromium)
- **Escape Hatch** - Direct access to the `native` Playwright object for any complex scenario
- **Shared Connection** - Built-in support for sharing DB connections between test and app threads (transactional tests)
- **Lint Friendly** - Includes RuboCop auto-configuration for E2E testing patterns

## Example

```ruby
# spec/e2e/login_spec.rb
RSpec.describe "User Login", type: :e2e do
  it "signs in successfully" do
    visit "/login"

    fill_in "Email", with: "user@example.com"
    fill_in "Password", with: "password"
    click_button "Sign In"

    expect(page).to have_current_path("/dashboard")
    expect(page).to have_content("Welcome, User!")
  end
end
```
