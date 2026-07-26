---
title: 'role_fu'
description: 'Modern, explicit role management and access control gem for Ruby on Rails.'
github: 'https://github.com/alec-c4/role_fu'
tags: ['Role Management', 'ACL', 'Ruby on Rails']
types: ['open-source']
order: 5
---

RoleFu is a modern, explicit role management gem for Ruby on Rails. It is designed as a cleaner, more performant alternative to legacy role gems, providing full control over role assignments and granular permissions.

## Why RoleFu?

- **Explicit Models** - Uses an explicit `RoleAssignment` join model instead of hidden tables, making it easy to add metadata or audit trails
- **N+1 Prevention** - Built-in support for `has_cached_role?` and optimized scopes
- **Strict by Default** - Resource-specific checks are strict, ensuring global roles don't accidentally leak permissions unless configured otherwise
- **Advanced Features** - Supports temporal (expiring) roles, metadata, audit logging, and granular abilities

## Example

```ruby
user = User.find(1)

# Global roles
user.grant(:admin)
user.has_role?(:admin) # => true

# Resource-specific roles
org = Organization.first
user.grant(:manager, org)
user.has_role?(:manager, org) # => true
user.has_role?(:manager)      # => false (strict by default)

User.with_role(:manager, org)
```
