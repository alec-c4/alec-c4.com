---
author: Alexey Poimtsev
pubDatetime: 2022-11-25T19:29:19.000+03:00
title: Rails scaffold templates
slug: 2022-11-25-rails-scaffold-templates
featured: false
tags:
  - ruby on rails
  - ruby
description: How to create templates for rails g scaffold command - controllers, views, tests
---

Starting from rails7, core team have changed scaffold templates and from my point of view - it is not the best change they have done. Every time I run `rails g scaffold Post title:string body:text` or something like this I need to change views, controller and specs to match my needs. And today I'll show you how to customize your templates to reduce time you spend to change generated code.

Firstly, let me show you where those templates are located. If you check links below - you'll see a source code of standard rails templates for [views](https://github.com/rails/rails/tree/main/railties/lib/rails/generators/erb/scaffold/templates) and [controllers](https://github.com/rails/rails/blob/main/railties/lib/rails/generators/rails/scaffold_controller/templates/controller.rb.tt).

Now, let's create our own templates. I'll start with the scaffold controller. All you need is to create directory `lib/templates/rails/scaffold_controller` and put `controller.rb.tt` file with your template. For my needs I did some small changes - just added support for i18n to `create`, `update` and `destroy` actions by adding

```ruby
notice: t(".create_successful")
```

to appropriate places.

Next, let's change our view templates. I don't like current ones so I took [templates from rails 6.x](https://github.com/rails/rails/tree/6-0-stable/railties/lib/rails/generators/erb/scaffold/templates) and updated it for my needs (for bootstrap based project I've taken [bootstrap_form gem](https://github.com/bootstrap-ruby/bootstrap_form) and have changed ujs-dependent code to use [hotwire](https://hotwired.dev/)). I've created directory `lib/templates/erb/scaffold` and placed my `_form.html.erb.tt`, `edit.html.erb.tt`, `index.html.erb.tt`, `partial.html.erb.tt`, `new.html.erb.tt`, `show.html.erb.tt` to that location. You can find my code below

**\_form.html.erb.tt**

```ruby
<%%= bootstrap_form_with(model: <%= model_resource_name %>) do |form| %>
  <%% if <%= singular_table_name %>.errors.any? %>
    <div style="color: red">
      <h2><%%= pluralize(<%= singular_table_name %>.errors.count, "error") %> prohibited this <%= singular_table_name %> from being saved:</h2>

      <ul>
        <%% <%= singular_table_name %>.errors.each do |error| %>
          <li><%%= error.full_message %></li>
        <%% end %>
      </ul>
    </div>
  <%% end %>

<% attributes.each do |attribute| -%>
  <div>
<% if attribute.password_digest? -%>
    <%%= form.password_field :password %>
  </div>

  <div>
    <%%= form.password_field :password_confirmation %>
<% elsif attribute.attachments? -%>
    <%%= form.<%= attribute.field_type %> :<%= attribute.column_name %>, multiple: true %>
<% else -%>
    <%%= form.<%= attribute.field_type %> :<%= attribute.column_name %> %>
<% end -%>
  </div>

<% end -%>
  <div>
    <%%= form.primary %>
  </div>
<%% end %>
```

**edit.html.erb.tt**

```ruby
<h1>Editing <%= human_name.downcase %></h1>

<%%= render "form", <%= singular_table_name %>: @<%= singular_table_name %> %>

<br>

<div>
  <%%= link_to "Show this <%= human_name.downcase %>", <%= model_resource_name(prefix: "@") %> %> |
  <%%= link_to "Back to <%= human_name.pluralize.downcase %>", <%= index_helper(type: :path) %> %>
</div>
```

**_index.html.erb.tt_**

```ruby
<h1><%= human_name.pluralize %></h1>

<table class="table" id="<%= plural_table_name %>">
  <thead>
    <tr>
<% attributes.reject(&:password_digest?).each do |attribute| -%>
<% if attribute.attachment? -%>
    <th>Download</th>
<% elsif attribute.attachments? -%>
    <th>Downloads</th>
<% else -%>
    <th><%= attribute.human_name %></th>
<% end -%>
<% end -%>
    <th colspan="3"></th>
    </tr>
  </thead>

  <tbody>
    <%%= render @<%= plural_table_name %> %>
  </tbody>
</table>


<%%= link_to "New <%= human_name.downcase %>", <%= new_helper(type: :path) %>, class: "btn btn-primary" %>
```

**partial.html.erb.tt**

```ruby
<tr>
<% attributes.reject(&:password_digest?).each do |attribute| -%>
    <td>
    <% if attribute.attachment? -%>
        <%%= link_to <%= singular_name %>.<%= attribute.column_name %>.filename, <%= singular_name %>.<%= attribute.column_name %> if <%= singular_name %>.<%= attribute.column_name %>.attached? %>
    <% elsif attribute.attachments? -%>
        <%% <%= singular_name %>.<%= attribute.column_name %>.each do |<%= attribute.singular_name %>| %>
          <div><%%= link_to <%= attribute.singular_name %>.filename, <%= attribute.singular_name %> %></div>
    <% else %>
        <%%= <%= singular_table_name %>.<%= attribute.column_name %> %>
    <% end %>
    </td>
<% end -%>
        <td><%%= link_to 'Show', <%= model_resource_name %>, class: "btn btn-light btn-sm" %></td>
        <td><%%= link_to 'Edit', edit_<%= singular_route_name %>_path(<%= singular_table_name %>), class: "btn btn-warning btn-sm" %></td>
        <td><%%= link_to 'Destroy', <%= model_resource_name %>, data: {turbo_method: :delete, turbo_confirm: 'Are you sure?'}, class: "btn btn-danger btn-sm" %></td>
</tr>
```

**_new.html.erb.tt_**

```ruby
<h1>New <%= human_name.downcase %></h1>

<%%= render "form", <%= singular_table_name %>: @<%= singular_table_name %> %>

<br>

<div>
  <%%= link_to "Back to <%= human_name.pluralize.downcase %>", <%= index_helper(type: :path) %> %>
</div>
```

**_show.html.erb.tt_**

```ruby
<% attributes.reject(&:password_digest?).each do |attribute| -%>
<p>
  <strong><%= attribute.human_name %>:</strong>
<% if attribute.attachment? -%>
  <%%= link_to @<%= singular_table_name %>.<%= attribute.column_name %>.filename, @<%= singular_table_name %>.<%= attribute.column_name %> if @<%= singular_table_name %>.<%= attribute.column_name %>.attached? %>
<% elsif attribute.attachments? -%>
  <%% @<%= singular_table_name %>.<%= attribute.column_name %>.each do |<%= attribute.singular_name %>| %>
    <div><%%= link_to <%= attribute.singular_name %>.filename, <%= attribute.singular_name %> %></div>
  <%% end %>
<% else -%>
  <%%= @<%= singular_table_name %>.<%= attribute.column_name %> %>
<% end -%>
</p>

<% end -%>
<%%= link_to 'Edit', edit_<%= singular_table_name %>_path(@<%= singular_table_name %>) %> |
<%%= link_to 'Back', <%= index_helper %>_path %>
```

And the last step - let's update rspec template for model. In my example I'll create a template for model spec with sections `fields` (to put field-specific tests, such as counter cache), `associations` (has_many, belongs_to etc), `validations` and `methods`. All I need it to create file `lib/templates/rspec/model/model_spec.rb.tt` with following

```ruby
require "rails_helper"

<% module_namespacing do -%>
RSpec.describe <%= class_name %>, <%= type_metatag(:model) %> do
  describe "fields" do
    pending "add some field tests (such as counter_cache) to (or delete) #{__FILE__}"
  end

  describe "associations" do
    pending "add some association tests to (or delete) #{__FILE__}"
  end

  describe "validations" do
    pending "add some validation tests to (or delete) #{__FILE__}"
  end

  describe "methods" do
    pending "add some method tests to (or delete) #{__FILE__}"
  end
end
<% end -%>
```

Now I'm happy, isn't it awesome? :)
