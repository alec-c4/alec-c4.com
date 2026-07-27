---
title: 'CLI in ruby using OptionParser or GetoptLong'
description: 'How to parse command line arguments in ruby using OptionParser or GetoptLong'
pubDate: 2024-04-24
slug: 2024-04-24-option-parser
tags: ['ruby']
---

A few days ago I created a script for the project I'm working on. It was an ugly script with hardcoded values, but it did the job - create tokens on request. But I've decided to improve it a bit, because sometimes I needed to change params and I've added the ability to submit params from the command line. Of course, there are a lot of awesome libraries such as [dry-cli](https://dry-rb.org/gems/dry-cli/), [TTY Toolkit](https://ttytoolkit.org) or [cli-kit from Shopify](https://github.com/Shopify/cli-kit), but in most cases you can use standard ruby libraries like OptionParser or GetoptLong. Let's see how you can create a CLI utility with those libraries in just a few minutes.

We will create a simple app, which will ask for your name for the time of the day. If there's no input - the script will show you a help screen with a list of required and optional arguments.

## GetoptLong

We will start with [GetoptLong](https://github.com/ruby/getoptlong) library.

```ruby
#!/usr/bin/env ruby

require "getoptlong"

opts = GetoptLong.new(
  [ '--help', '-h', GetoptLong::NO_ARGUMENT ],
  [ '--name', '-n', GetoptLong::REQUIRED_ARGUMENT ],
  [ '--time', GetoptLong::OPTIONAL_ARGUMENT ]
)

options = {}

help_message = <<-EOF
Usage: greeting.rb [options]

-h, --help:
   show help

--name yourname, -n yourname:
   your name

--time time_of_the_day:
   time of the day
      EOF

opts.each do |opt, arg|
  case opt

  when "--help"
    puts help_message

  when "--name"
    options[:name] = arg

  when "--time"
    options[:time] = arg
end
end

if options.empty?
  puts help_message
else
  puts "Good #{options[:time]}, #{options[:name]}"
end
```

Our code is simple - we create an instance of the `GetoptLong` class with a list of available params, then in case of a match with the param name we do execute some code.

## OptionParser

Next stop - [OptionParser](https://github.com/ruby/optparse). Similar to `GetoptLong` we create an instance of the `OptionParser` class with a list of available params. There is an `opts.banner` option which allows us to add some text before the list of available params.

```ruby
#!/usr/bin/env ruby

require 'optparse'


option_parser = OptionParser.new do |opts|
  opts.banner = 'Usage: greeting.rb [options]'

  opts.on '-n', '--name=NAME', 'Set name'
  opts.on '-t', '--time=TIME', 'Set time'
end

options = {}

option_parser.parse!(into: options)

if options.empty?
  puts option_parser
else
  puts "Good #{options[:time]}, #{options[:name]}"
end
```

Every solution is simple and easy to implement without any additional library, but `OptionParser` code looks more compact and readable, isn't it?
