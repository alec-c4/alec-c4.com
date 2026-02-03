---
title: 'role_fu'
description: 'Role management gem for Ruby on Rails'
link: 'https://github.com/alec-c4/role_fu'
github: 'https://github.com/alec-c4/role_fu'
tags: ['role management', 'acl', 'Ruby on Rails']
types: ['open-source']
order: 5
---

RoleFu is a modern, explicit role management gem for Ruby on Rails. It is designed as a cleaner, more performant alternative to legacy role gems, providing full control over role assignments and granular permissions.

## Why RoleFu?

- **Explicit Models**: Uses an explicit `RoleAssignment` join model instead of hidden tables, making it easy to add metadata or audit trails.
- **N+1 Prevention**: Built-in support for `has_cached_role?` and optimized scopes.
- **Strict by Default**: Resource-specific checks are strict, ensuring global roles don't accidentally leak permissions unless configured otherwise.
- **Advanced Features**: Supports temporal (expiring) roles, metadata, audit logging, and granular abilities.
