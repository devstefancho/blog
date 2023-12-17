---
slug: toggleTerm-0
date: '2023-12-15'
title: 'Toggle Term Plugin'
index: 0
---

## Why?

Neovim's terminal is a very cool, but not super ergonomic tool to use.
I find that I often want to set a process going and leave it to continue to run in the background.
I don't need to see it all the time. I just need to be able to refer back to it at intervals. I also sometimes want to create a new terminal and run a few commands.
Sometimes I want these side by side, and I really want these terminals to be easy to access.
I also want my terminal to look different from non-terminal buffers,
so I use winhighlight to darken them based on the Normal background colour.

This is the exact use case this was designed for. If that's your use case this might work for you.
