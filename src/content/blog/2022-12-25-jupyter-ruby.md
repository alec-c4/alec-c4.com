---
author: Alexey Poimtsev
pubDatetime: 2022-12-25T15:57:52.737Z
title: Running ruby on jupyter notebooks
postSlug: 2022-12-25-jupyter-ruby
featured: true
tags:
  - ruby
description: Running ruby on jupyter notebooks
---

Missed me? Don’t worry - I’m back, and I’d like to share an awesome thing I’ve found today.

You've maybe heard about [Jupyter notebooks](https://jupyter.org/) - an awesome web application which allows you to run python code in a browser. There are another similar project - [Livebook](https://livebook.dev/) which allow running Elixir code in browser.

But what to do if you are a ruby developer and `irb` and `pry` is not enough for you? Fortunately, with [iruby](https://github.com/SciRuby/iruby) gem you can run ruby code in Jupyter notebooks. So, lets start.

Firstly, you need to install Jupyter notebooks if it isn't installed yet on your laptop.

Install [python 3](https://www.python.org/). Let's check our versions

```
❯ python3 --version
Python 3.10.9
❯ pip3 --version
pip 22.3.1 from /Users/alec/Library/Python/3.10/lib/python/site-packages/pip (python 3.10)
```

Looks good. You maybe need to update installed packages.

```
❯ pip3 install --upgrade pip
Requirement already satisfied: pip in ./Library/Python/3.10/lib/python/site-packages (22.3.1)
```

Then install Jupyter

```
❯ pip3 install jupyter
Requirement already satisfied: jupyter in /usr/local/lib/python3.10/site-packages (1.0.0)
Requirement already satisfied: jupyter-console in /usr/local/lib/python3.10/site-packages (from jupyter) (6.4.4)
Requirement already satisfied: ipykernel in /usr/local/lib/python3.10/site-packages (from jupyter) (6.19.4)
Requirement already satisfied: nbconvert in /usr/local/lib/python3.10/site-packages (from jupyter) (7.2.7)
Requirement already satisfied: qtconsole in /usr/local/lib/python3.10/site-packages (from jupyter) (5.4.0)
Requirement already satisfied: ipywidgets in /usr/local/lib/python3.10/site-packages (from jupyter) (8.0.4)
...................
```

Let's check our installation

```
❯ jupyter notebook
[I 22:51:29.176 NotebookApp] Serving notebooks from local directory: /Users/alec
[I 22:51:29.176 NotebookApp] Jupyter Notebook 6.5.2 is running at:
[I 22:51:29.176 NotebookApp] http://localhost:8888/?token=1234567890
[I 22:51:29.176 NotebookApp]  or http://127.0.0.1:8888/?token=1234567890
[I 22:51:29.176 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 22:51:29.182 NotebookApp]

    To access the notebook, open this file in a browser:
        file:///Users/alec/Library/Jupyter/runtime/nbserver-11401-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/?token=1234567890
     or http://127.0.0.1:8888/?token=1234567890
```

Now you can open your browser and check - it should work now.

![image info](/blog/2022-12-25-jupyter-ruby/1.png)

Well, let's add support for ruby. Install `iruby` gem

```
❯ gem install iruby
Building native extensions. This could take a while...
Successfully installed iruby-0.7.4
1 gem installed
```

Then add it to Jupyter

```
❯ iruby register --force
```

That's it. Just restart Jupyter, and now you can run ruby code.

![image info](/blog/2022-12-25-jupyter-ruby/2.png)

Let's try to write something in ruby

![image info](/blog/2022-12-25-jupyter-ruby/3.png)

Well, it works! Awesome :)
