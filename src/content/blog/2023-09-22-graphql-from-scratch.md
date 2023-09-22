---
author: Alexey Poimtsev
pubDatetime: 2023-09-22
title: "Rails GraphQL authentication from scratch #1"
postSlug: 2023-09-22-graphql-from-scratch
featured: false
draft: false
tags:
  - ruby on rails
  - ruby
  - API
  - GraphQL
description: How to create GraphQL authentication from scratch without devise gem
---

[Devise](https://github.com/heartcombo/devise) is an awesome gem to add authentication for your rails application, but it may me a bit overkill solution if you are going to develop REST or GraphQL API for your SPA or mobile application. Today I'll show you how to create GraphQL API without devise. I'll use some methods that [become available](https://rubyonrails.org/2023/9/13/Rails-7-1-0-beta-1-has-been-released) in **rails 7.1.0.beta1**, so please install this or higher version.

## Project preparation

Firstly, let's create our rails application. Of course - you can use an `--api` key to skip adding asset pipeline to your project, but I'll use basic template because I need [graphiql-rails](https://github.com/rmosolgo/graphiql -rails) gem.

```
$ rails new graphql_from_scratch --database=postgresql --skip-test --skip-system-test -j bun
$ cd graphql_from_scratch/
$ rails db:create && rails db:migrate
```

I prefer to use UUID, so I'll create the following migration with `rails g migration EnableUuidPsqlExtension`

```ruby
class EnableUuidPsqlExtension < ActiveRecord::Migration[7.0]
  def change
    enable_extension "pgcrypto"
    enable_extension "uuid-ossp"
  end
end
```

Also, I'll add some test-relates gems:

```bash
$ bundle add rspec-rails shoulda-matchers factory_bot_rails ffaker database_cleaner database_cleaner-active_record email_spec --group "development, test"
$ rails g rspec:install
```

Then I'll create `config/initializers/generators.rb` file

```ruby
Rails.application.config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
  g.helper false
  g.test_framework :rspec,
    fixtures: false,
    view_specs: false,
    helper_specs: false,
    routing_specs: false
end
```

update `spec/rails_helper.rb`

```ruby
require "spec_helper"
ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require "rspec/rails"

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end

RSpec.configure do |config|
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  config.include FactoryBot::Syntax::Methods

  ### Database Cleaner
  config.before(:suite) { DatabaseCleaner.clean_with(:truncation) }
  config.before(:each) { DatabaseCleaner.strategy = :transaction }
  config.before(:each, js: true) { DatabaseCleaner.strategy = :truncation }
  config.before(:each) { DatabaseCleaner.start }
  config.after(:each) { DatabaseCleaner.clean }
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
```

and `spec/spec_helper.rb`

```ruby
require "action_mailer"
require "email_spec"
require "email_spec/rspec"

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
end
```

Next, we need to add graphql to our Gemfile

```bash
$ bundle add graphql
$ bundle add graphiql-rails --group "development"
$ rails g graphql:install
```

You can start our rails server with `./bin/dev` and open [http://localhost:3000/graphiql](http://localhost:3000/graphiql) to test our API with following query

```graphql
{
  testField
}
```

you will see

```json
{
  "data": {
    "testField": "Hello World!"
  }
}
```

It means that our API works fine. Don't forget to remove from `app/graphql/types/query_type.rb` following lines when you'll be ready for production.

```ruby
field :test_field, String, null: false,
  description: "An example field added by the generator"
def test_field
  "Hello World!"
end
```

We also need to update `app/graphql/mutations/base_mutation.rb` file and to add two additional fields - boolean `success` and array of `errors`. Now our file will look like

```ruby
module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    field :success, Boolean # <-- add this line
    field :errors, [String] # <-- add this line
  end
end
```

Well, now we can start working on our API.

## User model

Let's create our User model

```bash
$ rails g model User first_name last_name email password_digest

```

then update our migration

```ruby
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :first_name, null: false, default: ""
      t.string :last_name, null: false, default: ""
      t.string :email, null: false, default: ""
      t.string :password_digest

      t.timestamps
    end
  end
end
```

and model

```ruby
class User < ApplicationRecord
  EMAIL_REGEXP = /\A[^@\s]+@[^@\s]+\z/

  has_secure_password

  validates :first_name, presence: true, on: :update
  validates :last_name, presence: true, on: :update
  validates :password, presence: {on: create}, length: {minimum: 8, maximum: 128}
  validates :email, presence: true, uniqueness: {case_sensitive: false}, format: EMAIL_REGEXP

  normalizes :email, with: -> { _1.strip.downcase }

  ### Name
  def name=(full_name)
    self.first_name, self.last_name = full_name.to_s.squish.split(/\s/, 2)
  end

  def name
    [first_name, last_name].join(" ")
  end

  def to_s
    name
  end
end

```

I'd like to point you to the following line

```ruby
normalizes :email, with: -> { _1.strip.downcase }
```

Earlier, before rails 7.1 we've used something like

```ruby
before_validation do
  email&.downcase!&.strip!
end
```

but now our code look more compact and readable.

Also, we need to create `UserType` for our API

`app/graphql/types/user_type.rb`

```ruby
# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String
    field :last_name, String
    field :name, String, null: false
    field :email, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
```

Let's add some basic specs in `spec/models/user_spec.rb`

```ruby
require "rails_helper"

RSpec.describe User, type: :model do
  describe "validations" do
    it { should validate_presence_of(:first_name).on(:update) }
    it { should validate_presence_of(:last_name).on(:update) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:password) }
  end
end
```

and some code to `spec/factories/users.rb`

```ruby
FactoryBot.define do
  factory :user do
    email { FFaker::Internet.email }
    password { SecureRandom.hex }

    first_name { FFaker::Name.first_name }
    last_name { FFaker::Name.last_name }
  end
end
```

Don't forget to uncomment `bcrypt` gem in `Gemfile` and run `bundle install`

Now, our `bundle exec rspec` execution should be successful.

## Account registration - signUp method

First API method to develop - signUp.

- Input parameters: `name`, `email` and `password`
- Result: `User` in json
- Errors: Array of errors if any
- Description: Create User, then send email with confirmation link.

`app/graphql/mutations/users/sign_up.rb`:

```ruby
module Mutations::Users
  class SignUp < Mutations::BaseMutation
    graphql_name "signUp"

    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true
    field :errors, Types::ValidationErrorsType, null: true

    def resolve(args)
      user = User.new(args)

      if user.save
        confirmation_token = user.generate_confirmation_token
        UserMailer.confirmation(user, confirmation_token).deliver_now

        {user: user, success: true}
      else
        {errors: user.errors, success: false}
      end
    end
  end
end
```

As you may see - nothing complicated, but we need to add several things.

`app/graphql/types/mutation_type.rb` - we need to update this file with reference to `signUp` mutation:

```ruby
module Types
  class MutationType < Types::BaseObject
    field :sign_up, mutation: Mutations::Users::SignUp # <-- add this line
  end
end
```

`app/graphql/types/validation_errors_type.rb` - This class is responsible for representing of error messages.

```ruby
module Types
  class ValidationErrorsType < Types::BaseObject
    field :details, String, null: false
    field :full_messages, [String], null: false

    def details
      object.details.to_json
    end
  end
end
```

Next - we need to add `generate_confirmation_token` method to model `User`:

```ruby
class User < ApplicationRecord
  #################### Add those lines

  CONFIRMATION_TOKEN_EXP = 30.minutes

  def generate_confirmation_token
    signed_id expires_in: CONFIRMATION_TOKEN_EXP, purpose: :confirm_email
  end

  ####################
end

```

I'd like to point you to `signed_in` method, which is used to create expiable token with token purpose, we will use it in several other methods.

Also, we need to add UserMailer and related views.

`app/mailers/user_mailer.rb`

```ruby
class UserMailer < ApplicationMailer
  def confirmation(user, confirmation_token)
    @user = user
    @confirmation_token = confirmation_token

    mail to: @user.email, subject: "Confirmation Instructions"
  end
end
```

`app/views/user_mailer/confirmation.html.erb`

```erb
<h1>Confirmation Instructions</h1>

<%= link_to "Click here to confirm your email.", confirmation_url(@confirmation_token) %>
```

`app/views/user_mailer/confirmation.text.erb`

```erb
Confirmation Instructions

<%= confirmation_url(@confirmation_token) %>
```

Let's try how it works in GraphQL console.

```graphql
mutation {
  signUp(
    input: {
      name: "Alexey Poimtsev"
      email: "test@example.com"
      password: "1234567890"
    }
  ) {
    user {
      id
      email
      name
    }
    success
    errors {
      fullMessages
    }
  }
}
```

and voila - everything works fine:

```json
{
  "data": {
    "signUp": {
      "user": {
        "id": "9375a213-cf56-4136-b8f8-38a5f8a8ba60",
        "email": "test@example.com",
        "name": "Alexey Poimtsev"
      },
      "success": true,
      "errors": null
    }
  }
}
```

If we try to use incorrect input

```graphql
mutation {
  signUp(input: { name: "Alexey Poimtsev", email: "test@", password: "" }) {
    user {
      id
      email
      name
    }
    success
    errors {
      fullMessages
    }
  }
}
```

then we'll see following error message

```json
{
  "data": {
    "signUp": {
      "user": null,
      "success": false,
      "errors": {
        "fullMessages": [
          "Password can’t be blank",
          "Password is too short (minimum is 8 characters)",
          "Email is invalid"
        ]
      }
    }
  }
}
```

And, of course we need to cover it with specs

`spec/graphql/mutations/users/sign_up_spec.rb`

```ruby
require "rails_helper"

RSpec.describe "#signUp mutation" do
  let(:mutation) do
    <<~GQL
        mutation signUp($name: String!, $email: String!, $password: String!) {
          signUp(input: {
            name: $name
            email: $email
            password: $password
          }) {
          user {
            id
            email
            name
          }
          success
          errors {
            details
            fullMessages
          }
        }
      }
    GQL
  end

  it "is successful with correct data" do
    name = FFaker::Name.name
    email = FFaker::Internet.email
    result = GraphqlFromScratchSchema.execute(mutation, variables: {
      name: name,
      email: email,
      password: SecureRandom.hex
    })

    expect(result.dig("data", "signUp", "user", "email")).to eq(email)
    expect(result.dig("data", "signUp", "user", "name")).to eq(name)
    expect(result.dig("data", "signUp", "success")).to eq(true)
    expect(result.dig("data", "signUp", "errors")).to be_nil
  end


  it "fails in case of wrong email format" do
    wrong_email = "test.user"
    result = GraphqlFromScratchSchema.execute(mutation, variables: {
      name: FFaker::Name.name,
      email: wrong_email,
      password: SecureRandom.hex
    })

    expect(result.dig("data", "signUp", "user")).to be_nil
    expect(result.dig("data", "signUp", "success")).to eq(false)
    expect(result.dig("data", "signUp", "errors", "details")).to eq("{\"email\":[{\"error\":\"invalid\",\"value\":\"#{wrong_email}\"}]}")
    expect(result.dig("data", "signUp", "errors", "fullMessages")).to include("Email is invalid")
  end

  it "fails in case of no password" do
    result = GraphqlFromScratchSchema.execute(mutation, variables: {
      name: FFaker::Name.name,
      email: FFaker::Internet.email,
      password: ""
    })

    expect(result.dig("data", "signUp", "user")).to be_nil
    expect(result.dig("data", "signUp", "success")).to eq(false)
    expect(result.dig("data", "signUp", "errors", "details")).to eq("{\"password\":[{\"error\":\"blank\"},{\"error\":\"too_short\",\"count\":8}]}")
    expect(result.dig("data", "signUp", "errors", "fullMessages")).to include("Password can’t be blank")
    expect(result.dig("data", "signUp", "errors", "fullMessages")).to include("Password is too short (minimum is 8 characters)")
  end
end
```

`spec/mailers/user_mailer_spec.rb`

```ruby
require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "confirmation" do
    let(:mail) { UserMailer.confirmation(FactoryBot.create(:user, email: "to@example.org"), "confirmation-token-0123456789") }

    it "renders the headers" do
      expect(mail.subject).to eq("Confirmation Instructions")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["from@example.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Click here to confirm your email.")
    end

    it "should be set to be delivered to the email passed in" do
      expect(mail).to deliver_to("to@example.org")
    end

    it "should contain a link to the confirmation link" do
      expect(mail).to have_body_text(/#{confirmation_url("confirmation-token-0123456789")}/)
    end
  end
end
```

`spec/mailers/previews/user_mailer_preview.rb`

```ruby
# Preview all emails at http://localhost:3000/rails/mailers/user
class UserMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/user/confirmation
  def confirmation
    UserMailer.confirmation(User.first || FactoryBot.create(:user, email: "to@example.org"), "confirmation-token-0123456789")
  end
end
```

Almost perfect, but when we run tests we will see `NoMethodError: undefined method 'confirmation_url'`. To fix it, we need to add `app/helpers/urls_helper.rb`

```ruby
module UrlsHelper
  ### We will use those helper methods to send requests to frontend


  # Don't forget to replace `http://localhost:3000` with correct url.
  def confirmation_url(token) = "http://localhost:3000/users/confirm/#{token}"

  def confirmation_path(token) = "/users/confirm/#{token}"
end
```

and update `app/mailers/application_mailer.rb`

```ruby
class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  layout "mailer"

  helper :urls # <-- add this line
end
```

Awesome! In next articles in the series, we will add new methods and improve existing code. Stay tuned!
