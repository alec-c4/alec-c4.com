---
author: Alexey Poimtsev
pubDatetime: 2023-09-25
title: "Rails GraphQL authentication from scratch #2"
postSlug: 2023-09-22-graphql-from-scratch-2
featured: false
draft: false
tags:
  - ruby on rails
  - ruby
  - API
  - GraphQL
description: How to create GraphQL authentication from scratch without devise gem. Part 2
---

Welcome back to my series how to develop GraphQL API for rails applications from scratch.

## Authentication - signIn method

To authenticate our users, we need to add [jwt gem](https://github.com/jwt/ruby-jwt) to our `Gemfile`

```bash
$ bundle add jwt
```

and create `app/models/auth_token.rb`

```ruby
class AuthToken
  def self.key
    Rails.application.credentials.jwt_secret
  end

  def self.token(user)
    payload = {user_id: user.id}
    JWT.encode(payload, key)
  end

  def self.verify(token)
    result = JWT.decode(token, key)[0]
    User.find_by(id: result["user_id"])
  rescue JWT::VerificationError, JWT::DecodeError
    nil
  end
end
```

How does it work. We use `jwt_secret` which is stored in rails credentials to create a token which stores `user_id` and to find `User` record by token.

Let's create our `jwt_secret` for development and test environments

```bash
$ rails credentials:edit --environment=development
$ rails credentials:edit --environment=test
```

and add the following line

```yaml
jwt_secret: "secret"
```

Btw, don't forget to generate secure keys using

```bash
$ rails secret
```

Let's test it out.

```ruby
AuthToken.key # "secret"

user = User.create(email: FFaker::Internet.email, password: SecureRandom.hex, first_name: FFaker::Name.first_name, last_name: FFaker::Name.last_name )

AuthToken.token(user) # "token-secret-value"

AuthToken.verify("token-secret-value") # returns User instance
```

Next, let's implement `current_user` method. We need to update `app/controllers/graphql_controller.rb`

```ruby
class GraphQLController < ApplicationController

 protect_from_forgery with: :null_session # <-- uncomment this line

  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]
    context = {
      current_user: current_user # <-- add this line
    }
    result = GraphqlFromScratchSchema.execute(query, variables: variables, context: context, operation_name: operation_name)
    render json: result
  rescue => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

############### Add this method

  def current_user
    return nil if request.headers["Authorization"].blank?
    token = request.headers["Authorization"].split(" ").last
    return nil if token.blank?
    AuthToken.verify(token)
  end

###############

end
```

We need to create our mutation in `app/graphql/mutations/users/sign_in.rb`

```ruby
module Mutations::Users
  class SignIn < Mutations::BaseMutation
    graphql_name "signIn"

    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::UserType, null: true
    field :token, String, null: true

    def resolve(email:, password:)
      user = User.find_by(email:)
      errors = {}

      if user&.authenticate(password)
        context[:current_user] = user
        token = AuthToken.token(user)

        {token: AuthToken.token(user), user:, success: true}
      else
        user = nil
        context[:current_user] = nil

        raise GraphQL::ExecutionError, "Incorrect Email/Password"
      end
    end
  end
end
```

and add it to `app/graphql/types/mutation_type.rb`

```ruby
module Types
  class MutationType < Types::BaseObject
    field :sign_up, mutation: Mutations::Users::SignUp
    field :sign_in, mutation: Mutations::Users::SignIn # <-- add this line
  end
end
```

Let's try it in our GraphQL console

```graphql
mutation {
  signIn(input: { email: "test@example.com", password: "1234567890" }) {
    user {
      id
      email
      name
    }
    success
    token
  }
}
```

And you'll see a result

```json
{
  "data": {
    "signIn": {
      "user": {
        "id": "9a7fb463-2493-48f6-8641-509f58c9b47f",
        "email": "test@example.com",
        "name": "Alexey Poimtsev"
      },
      "success": true,
      "token": "correct-token"
    }
  }
}
```

In case of wrong email/password

```graphql
mutation {
  signIn(input: { email: "test@example.com", password: "111" }) {
    user {
      id
      email
      name
    }
    success
    token
  }
}
```

You'll see an error message

```json
{
  "data": {
    "signIn": null
  },
  "errors": [
    {
      "message": "Incorrect Email/Password",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": ["signIn"]
    }
  ]
}
```

Don't forget to write specs `spec/graphql/mutations/users/sign_in_spec.rb`

```ruby
require "rails_helper"

RSpec.describe "#signIn mutation" do
  before do
    @password = SecureRandom.hex
    @user = FactoryBot.create(:user, email: "user@example.com", password: @password)
  end

  let(:mutation) do
    <<~GQL
      mutation signIn($email: String!, $password: String!) {
        signIn(input: {
          email: $email
          password: $password
        }) {
          user {
            id
            email
            name
          }
          token
        }
      }
    GQL
  end

  it "is successful with correct email and password" do
    result = GraphqlFromScratchSchema.execute(mutation, variables: {
      email: "user@example.com",
      password: @password
    })

    expect(result.dig("data", "signIn", "errors")).to be_nil
    expect(result.dig("data", "signIn", "user", "email")).to eq("user@example.com")
    expect(result.dig("data", "signIn", "user", "id")).to be_present
    expect(result.dig("data", "signIn", "token")).to be_present
  end


  it "fails with wrong password" do
    result = GraphqlFromScratchSchema.execute(mutation, variables: {
      email: "user@example.com",
      password: "wrong-password"
    })

    expect(result.dig("data", "signIn", "user", "id")).to be_nil
    expect(result.dig("data", "signIn", "token")).to be_nil
    expect(result.dig("errors", 0, "message")).to eq("Incorrect Email/Password")
  end
end
```

![](/blog/2023-09-25-graphql-from-scratch-2/1.jpg)

Let's break for a while to improve our code a bit.

## Improvements - whoAmI method, inflections and GraphQL schema dump

Let's add a helper method to easily test our authentication. Add following lines to `app/graphql/types/query_type.rb` (you can replace `test_field` method)

```ruby
field :who_am_i, String, null: false,
  description: "Who am I"
def who_am_i
  "You've authenticated as #{context[:current_user].presence || "guest"}."
end
```

If you're not authenticated

```graphql
{
  whoAmI
}
```

you'll see

```json
{
  "data": {
    "whoAmI": "You've authenticated as guest."
  }
}
```

But if you use correct token

```json
{
  "Authorization": "correct-token"
}
```

You'll see

```json
{
  "data": {
    "whoAmI": "You've authenticated as Alexey Poimtsev."
  }
}
```

Let's play with inflections. Open file `config/initializers/inflections.rb` and make in looks like

```ruby
ActiveSupport::Inflector.inflections(:en) do |inflect|
  inflect.acronym "RESTful"
  inflect.acronym "GraphQL" # <-- add this line
end
```

Now, we can rename in `app/controllers/graphql_controller.rb` class name `GraphqlController` to `GraphQLController`. Looks better, isn't it? But don't forget to rename every `Graphql` string in class names to `GraphQL`.

Let's add rake task for schema dump. I've created `lib/tasks/graphql.rake` with following code

```ruby
namespace :graphql do
  desc "Dump GraphQL schema"
  task dump_schema: :environment do
    # Get a string containing the definition in GraphQL IDL:
    schema_defn = GraphQLFromScratchSchema.to_definition
    # Choose a place to write the schema dump:
    schema_path = "app/graphql/schema.graphql"
    # Write the schema dump to that file:
    File.write(Rails.root.join(schema_path), schema_defn)
    puts "Updated #{schema_path}"
  end
end
```

and added spec in `spec/graphql/schema_spec.rb`

```ruby
require "rails_helper"

RSpec.describe "GraphQL schema" do
  it "must be reflected in the .graphql file" do
    current_defn = GraphQLFromScratchSchema.to_definition
    printout_defn = File.read(Rails.root.join("app/graphql/schema.graphql"))
    assert_equal(current_defn, printout_defn, "Update the printed schema with `bundle exec rake dump_schema`")
  end
end
```

Now, with

```bash
$ rake graphql:dump_schema
```

I'll have updated schema in `app/graphql/schema.graphql` and specs will remind me to update it.
