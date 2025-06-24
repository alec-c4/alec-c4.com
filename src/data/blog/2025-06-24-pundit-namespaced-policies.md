---
author: Alexey Poimtsev
pubDatetime: 2025-06-24T23:51:00.000+03:00
title: Namespaced Pundit Policies Without the Repetition Racket
featured: false
draft: false
tags:
  - ruby
  - ruby on rails
  - security
  - rubygems
description: Cleaning Up Namespaced Pundit Policies
---

If you're using [Pundit](https://github.com/varvet/pundit) in a Rails app with namespaced policies — for example, `Admin::PostPolicy` — you’ve probably seen the official recommendation that goes something like this:

```ruby
class AdminController < ApplicationController
  def policy_scope(scope)
    super([:admin, scope])
  end

  def authorize(record, query = nil)
    super([:admin, record], query)
  end
end

class Admin::PostController < AdminController
  def index
    policy_scope(Post)
  end

  def show
    post = authorize Post.find(params[:id])
  end
end
```

Yeah, it works. But repeating that in every base controller gets old fast — and feels a bit noisy.

Let’s clean it up.

Here’s a small concern you can drop into `app/controllers/concerns/namespaced_policy.rb`:

```ruby
# Controller concern for namespaced Pundit policies
#
# Usage:
#   include NamespacedPolicy::Policy(:users)
#   include NamespacedPolicy::Policy(:admin)
module NamespacedPolicy
  def self.Policy(scope)
    Module.new do
      define_method :policy_scope do |scope_class|
        super([scope, scope_class])
      end

      define_method :authorize do |record, query = nil|
        super([scope, record], query)
      end

      private :policy_scope, :authorize
    end
  end
end
```

And now your controllers stay nice and tidy:

```ruby
class AdminController < ApplicationController
  include NamespacedPolicy::Policy(:admin)
end

class Admin::PostController < AdminController
  def index
    policy_scope(Post)
  end

  def show
    post = authorize Post.find(params[:id])
  end
end
```

Much cleaner. Less boilerplate. Your future self will thank you.
