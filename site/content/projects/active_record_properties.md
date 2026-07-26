---
title: 'active_record_properties'
description: 'Type-safe, JSONB-backed properties for ActiveRecord models — no extra settings table required.'
github: 'https://github.com/alec-c4/active_record_properties'
tags: ['Ruby on Rails', 'Active Record']
types: ['open-source']
order: 7
---

Type-safe properties stored in JSONB for ActiveRecord models. A modern, lightweight alternative to separate settings tables.

## Why ActiveRecordProperties?

Store model settings and properties in a JSONB column with:

- **Clean DSL** - Simple, readable property definitions
- **Type Safety** - Built-in type casting for common types
- **Default Values** - Static or dynamic (proc) defaults
- **Performance** - No JOINs, everything in one table
- **Flexibility** - Use any JSONB column name
- **Rails-native** - Built on `store_accessor` and `attribute` APIs

## Example

```ruby
class User < ApplicationRecord
  include ActiveRecordProperties::Settable

  has_properties do
    property :theme, type: :string, default: "light"
    property :notifications_enabled, type: :boolean, default: true
  end
end

user = User.new
user.theme                   # => "light"
user.notifications_enabled   # => true
user.theme = "dark"
user.save!

user.properties # => {"theme"=>"dark", "notifications_enabled"=>true}
```
