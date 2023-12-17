---
slug: toggleTerm-1
date: '2023-12-15'
title: 'Toggle Term Plugin'
index: 1
---

## Installation

Use lazy.nvim

```lua
return {
  -- Terminal
  {
    "akinsho/toggleterm.nvim",
    version = "*",
    config = function()
      require("toggleterm").setup({
        open_mapping = [[<c-\>]],
        start_in_insert = true,
        direction = "float",
      })
  },
}
```
