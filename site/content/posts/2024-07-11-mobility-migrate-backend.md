---
title: 'How to migrate from KeyValue to Container backend in mobility gem'
description: 'How to change KeyValue to Container backend in mobility gem'
pubDate: 2024-07-11
slug: 2024-07-11-mobility-migrate-backends
tags: ['ruby on rails', 'ruby', 'rubygems']
---

One of the tasks I'm currently working on is migration from [KeyValue backend](https://github.com/shioyama/mobility/wiki/KeyValue-Backend) to [Container backend](https://github.com/shioyama/mobility/wiki/Container-Backend) in the project powered with [mobility](https://github.com/shioyama/mobility/) gem. Today we'll try to perform such migration. Of course - you can adapt code below to migrate between other backends.

Firstly, you need to change your backend in the config file `config/initializers/mobility.rb` if you want to act globally

```ruby
Mobility.configure do
  plugins do
    # backend :key_value
    backend :container

    # ........
  end
end
```

or in model

```ruby
class Tag < ApplicationRecord
  # translates :title, backend: :key_value
  translates :title, backend: :container
end
```

Let's collect information about translated models. There are 2 database tables which are used to store translations on key-value backend - `mobility_string_translations` and ``mobility_text_translations`. Those tables contain data in the following format:

- `id` - record id
- `locale` - locale of the translated string/text
- `key` - translated key, in code sample above, it is `title`
- `value` - comments are unnecessary
- `translatable_type` and `translatable_id` - class and id of translated model, in code sample above it is `Tag` with some id
- `created_at` and `updated_at` - timestamps

Let's collect information about translated models

```pgsql
app_dev=# select distinct translatable_type from mobility_string_translations;
 translatable_type
-------------------
 Country
 Tag
 Interest
(3 rows)


app_dev=# select distinct translatable_type from mobility_text_translations;
 translatable_type
-------------------
(0 rows)
```

As you see - there are only strings, but no text translations, so let's move on.

Next step - let's add required columns to our tables

```sh
rails g migration MigrateToContainerMobilityBackend
```

```ruby
class MigrateToContainerMobilityBackend < ActiveRecord::Migration[7.1]
  def change
    %w[tags countries interests].each do |table|
      change_table table.to_sym, bulk: true do |t|
        t.jsonb :translations, default: {}
      end
    end
  end
end
```

Don't forget to remove type from mobility DSL in models

```ruby
class Tag < ApplicationRecord
  extend Mobility

  # translates :title, type: :string, locale_accessors: true
  translates :title, locale_accessors: true
end
```

Then we will write some code to copy data. You can use it in the rake task, new migration or console - as you wish.

```ruby
ActiveRecord::Base.connection.execute("select * from mobility_string_translations").each do |tr|
  tr["translatable_type"].constantize.find(tr["translatable_id"]).update!("#{tr["key"]}_#{tr["locale"]}": tr["value"])
end

ActiveRecord::Base.connection.execute("select * from mobility_text_translations").each do |tr|
  tr["translatable_type"].constantize.find(tr["translatable_id"]).update!("#{tr["key"]}_#{tr["locale"]}": tr["value"])
end
```

Latest step - now you can drop unneccessary tables and columns

```sh
rails g migration DropMobilityTablesAndUnusedColumns
```

```ruby
class DropMobilityTablesAndUnusedColumns < ActiveRecord::Migration[7.1]
  def change
    drop_table :mobility_string_translations
    drop_table :mobility_text_translations

    # if you haven't removed those columns before
    remove_column :tags, :title
    remove_column :interests, :title
    remove_column :countries, :title
  end
end
```

Easy, huh? Hope this recipe will be useful for you.
