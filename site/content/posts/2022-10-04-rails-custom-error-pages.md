---
title: 'Custom error pages in rails applications'
description: 'How to create custom error pages to preview them in development mode'
pubDate: 2022-10-04
slug: 2022-10-04-rails-custom-error-pages
tags: ['ruby on rails', 'ruby']
---

Ruby on rails is shipped with html-based error pages, but with some easy steps you can create your own erb-based pages. So, let's do it.

Firstly you need to create controller, views and routes for your pages.

```bash
rails g controller errors not_found unprocessable unacceptable internal_server_error
```

This generator will create at least following files - `app/controllers/errors_controller.rb`, `app/views/errors` directory and add routes to your `config/routes.rb`

**errors_controller.rb**:

```ruby
class ErrorsController < ApplicationController
  layout false

  def not_found
    render status: :not_found
  end

  def unprocessable
    render status: :unprocessable_entity
  end

  def unacceptable
    render status: :not_acceptable
  end

  def internal_server_error
    render status: :internal_server_error
  end
end

```

**config/routes.rb**:

```ruby
  ### Errors
  match "/404", to: "errors#not_found", via: :all
  match "/406", to: "errors#unacceptable", via: :all
  match "/422", to: "errors#unprocessable", via: :all
  match "/500", to: "errors#internal_server_error", via: :all
```

Now, you need to disable default rails error handler. To do that you need to add following line to your `config/application.rb`

```ruby
  class Application < Rails::Application

    # use custom error pages
    config.exceptions_app = routes

  end
```

If you want to test error pages locally, you need to set following option in your `config/environments/development.rb`

```ruby
  # Show full error reports.
  config.consider_all_requests_local = false
```

Almost perfect, but I'd like to propose you some improvements. Let's look back to `config/environments/development.rb` and to some changes

```ruby
  # Show full error reports.
  config.consider_all_requests_local = !Rails.root.join("tmp/errors-dev.txt").exist?
```

When you start your application, it will check for file `tmp/errors-dev.txt` and enable or disable custom error pages. Then, let's create file `lib/tasks/dev.rake` with following code

```ruby
namespace :dev do
  desc "Use custom error pages"
  task :errors do
    if File.exist?("tmp/errors-dev.txt")
      puts "Now you'll use default (development) error pages" if FileUtils.rm("tmp/errors-dev.txt")
    elsif FileUtils.touch("tmp/errors-dev.txt")
      puts "Now you'll use custom error pages"
    end
  end
end
```

Every time you need to enable custom error pages locally, just run in console

```bash
rake dev:errors
```

then restart your server, and you'll switch error pages from default to custom and back.
