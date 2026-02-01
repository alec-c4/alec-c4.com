---
title: 'macOS setup for hackers and power users (macOS Sequoia edition) #1'
description: "How to configure your MacBook if you're developer or advanced user"
pubDate: 2024-09-22
slug: 2024-09-22-macos-sequoia-for-hackers
tags: ['Apple', 'macOS']
---

On September 16th, Apple have released macOS Sequoia 15.0, so I've decided to write down several articles how to configure it for development purposes from zero to development-ready state. I work with Ruby on Rails, JavaScript tooling, Flutter, React Native and some other tools, so my config will contain tools, required for my work, so if you'd like to use your own toolbox - just change to your own tools.

## Table of contents

## System settings

We will start with Control Center. Firstly, let's enable battery status widget and set "display percentage" to on. I do recommend to disable all items from menubar, except

- Focus (Show when active)
- Screen mirroring (Show when active)
- Battery (Always visible)

It is useful, especially if you use a MacBook with notch.

![Control center](/images/macos-sequoia/system-01.png)

Next option we need to change - desktop and dock preferences. We've set dock small as possible, enabled magnification on hover and auto-hide. Also, applications will minimize to the application icon, but not to create extra icons in dock on minimize. To keep desktop looks clean - we've unchecked check-boxes "Show items on desktop and stage manager".

![Desktop and dock](/images/macos-sequoia/system-02.png)

To group application windows in mission control, you can check the following switch.

![Desktop and dock](/images/macos-sequoia/system-03.png)

Another useful option is preferring to open new tabs instead of new windows.

![Desktop and dock](/images/macos-sequoia/system-04.png)

You may need to change resolution, especially if you use a device with a large screen.

![Display settings](/images/macos-sequoia/system-05.png)

I recommend you to disable annoying boot up sound and sounds of notifications. You may need to disable most of the notification banners too, but it up to you. Especially for me, I prefer to keep only important notifications.

![Notifications](/images/macos-sequoia/system-06.png)
![Sounds](/images/macos-sequoia/system-07.png)

Let's update some security preferences. I recommend you to require password after screen saver start, but to use 5 sec delay instead of immediately. But, if you do use iPhone mirroring app with automatic authentication - you'll be forced to use immediately lock-up. Also, you may need to set a lock screen message, e.g. your favorite saying :)

![Lock screen](/images/macos-sequoia/system-08.png)

If you're an owner of an Apple Watch, you can set up to unlock your MacBook/iMac using the device on your wrist.

![Touch ID and password](/images/macos-sequoia/system-09.png)

In case if you have any iCloud subscription - don't forget to enable Documents and Desktop folders sync.

![iCloud](/images/macos-sequoia/system-10.png)
![iCloud](/images/macos-sequoia/system-11.png)
![iCloud](/images/macos-sequoia/system-12.png)

Next step - trackpad configuration. I recommend to set up tap-to-click, App Expose ...

![Trackpad](/images/macos-sequoia/system-13.png)
![Trackpad](/images/macos-sequoia/system-14.png)

... and windows dragging with 3 fingers.

![Trackpad](/images/macos-sequoia/system-15.png)
![Trackpad](/images/macos-sequoia/system-16.png)

## Desktop

To keep desktop (almost) clean - I recommend to use stacks (right-click on the desktop).

![Stacks](/images/macos-sequoia/desktop-01.png)

## Dock

Let's do cleanup our dock and remove icons of unused apps, just drag icon away from your dock and release somewhere on the desktop. It is my personal preference, but I like to see Downloads folder in dock displayed as a stack and content displayed as a grid.

![Dock](/images/macos-sequoia/dock-01.png)

## Launchpad

You may need to sort applications on the Launchpad screen, grouping them to folders.

## Finder

Let's do some tweaks for Finder. You may need to show some places in the sidebar (e.g. home folder) ...

![Finder](/images/macos-sequoia/finder-01.png)

... show filename extensions, automatically empty trash, start search in current folder ...

![Finder](/images/macos-sequoia/finder-02.png)

... and show full path and status bar at the bottom.

![Finder](/images/macos-sequoia/finder-03.png)

Also, you may need to customize your toolbar and to add additional buttons, but it is up to you :)

## Safari

Some tweaks for Safari. I recommend to disable option to "open safe files", ...

![Safari](/images/macos-sequoia/safari-01.png)

... show full URL, set minimum font size and. Because we are developers (isn't it?) - enable developer tools in browser.

![Safari](/images/macos-sequoia/safari-02.png)

One more useful tweak for Safari. To prevent accidental quit from the browser - you can configure another hotket from the system settings. Go to the System settings -> Keyboard -> Keyboard Shortcuts. Then choose Safari, then `Quit Safari` and your own hotkey. Voila!

![Safari](/images/macos-sequoia/safari-03.png)

## Mail

Next stop - Mail.app. Let's enable the option to resend email in case if SMTP server isn't available.

![Mail](/images/macos-sequoia/mail-01.png)

Then enable junk mail filtering and ...

![Mail](/images/macos-sequoia/mail-02.png)

... change sorting order to display latest mail on the top of the list.

![Mail](/images/macos-sequoia/mail-03.png)

## Notes

To prevent saving notes which isn't synced with iCloud, I do recommend to disable local notes.

![Notes](/images/macos-sequoia/notes-01.png)

We've done with basic system settings, so we can proceed to [part 2](/posts/2024-12-14-macos-setup-for-hackers-2) to set up our tooling.
