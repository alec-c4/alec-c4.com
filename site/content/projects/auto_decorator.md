---
title: 'auto_decorator'
description: 'Zero-configuration, convention-based decorator autoloading for Rails models.'
github: 'https://github.com/alec-c4/auto_decorator'
tags: ['Ruby on Rails', 'Active Record', 'Decorator']
types: ['open-source']
order: 8
---

Convention-based decorator autoloading for Rails models.

Decorators are plain Ruby modules that get automatically included into your model classes based on file naming convention — no configuration required.

> **Why not Draper?** Draper wraps objects in presenter classes. `auto_decorator` adds methods directly to the model. Less indirection, less boilerplate, same result for most use cases.

## Example

```ruby
# app/decorators/user_decorator.rb
module UserDecorator
  def full_name
    [first_name, last_name].compact.join(" ")
  end
end
```

```ruby
user = User.find(1)
user.full_name # => "Alice Smith"
```
