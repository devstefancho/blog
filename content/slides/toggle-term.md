---
slug: toggleTerm
date: '2023-12-15'
title: 'toggleTerm / Alpha'
---

# 안녕하세요

| _**About Me**_           |
| ------------------------ |
| dev-stefan-cho (조성진)  |
| Frontend Developer (Web) |
| Javascript, Lua          |
| Vim(+3y), Neovim(+1y)    |

---

# 목차

1. ToggleTerm
2. Alpha
3. 마무리

---

# tmux로 terminal split

작업공간과 로컬서버용 터미널을 분리하기 적합하였고,
tmux를 약간 커스텀하면 더 편하게 활용이 가능했음

| Vertical Split | Horizontal Split |
| -------------- | ---------------- |
| `Ctrl + b + %` | `Ctrl + b + "`   |

```
set-option -g prefix C-a

# split window
bind v split-window -h -c "#{pane_current_path}"
bind s split-window -v -c "#{pane_current_path}" \; resize-pane -y 10 # split pane with 10 lines
```

---

# 하지만...

- tmux prefix를 사용하는게 불편했고,
- zoom in/out 기능도 좋지만,
- 가끔 현재 켜져있는 서버와 vim이 매칭 되지 않는 문제...
- vim내에서 터미널을 다루고 싶은 욕구가 커짐

---

# :help toggleterm-why?

> I find that I often want to set a process going and leave it to continue to run in the background.
> I also sometimes want to create a new terminal and run a few commands.
> I also want my terminal to look different from non-terminal buffers,

백그라운드에 두고 싶고,

새로운 터미널을 생성해서 몇가지 명령어를 실행하고 싶고,

터미널이 다른 버퍼와 다른 모습이면 좋겠고,

---

# 설치하기

```lua
-- lazy.nvim
return {
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

---

# 설치하기

```lua
-- lazy.nvim
return {
  {
    "akinsho/toggleterm.nvim",
    version = "*",
    config = function()
      require("toggleterm").setup({
        open_mapping = [[<c-\>]], -- 기본 ToggleTerm 명령어
        start_in_insert = true,
        direction = "float",
      })
  },
}
```

---

# YarnDev용 terminal

1. `:YarnDev` 로 터미널을 연다
1. `yarn dev`를 입력한다
1. `esc`로 닫는다

이때 일반 터미널 토글로는 YarnDev용 터미널이 열려서는 안된다

---

# YarnDev용 terminal - Showcase

<video width="800" controls>
  <source src="/yarn-dev-video.mov" type="video/mp4" />
</video>

---

# YarnDev용 terminal - 설정

```lua
function _Node_server_toggle()
  local opts = { buffer = 0 }
  local node_server = Terminal:new({
    hidden = true,
    count = 5,
    direction = "float",
    on_open = function(term)
      keymap("t", "<esc>", function()
        term:toggle()
      end, opts)
    end,
  })
  node_server:toggle()
end
```

---

# YarnDev용 terminal - 설정

```lua
function _Node_server_toggle()
  local opts = { buffer = 0 }
  local node_server = Terminal:new({
    hidden = true, -- 기본 ToggleTerm 명령에 의해서 토글되지 않음
    count = 5, -- 터미널 고유번호
    direction = "float", -- 레이아웃
    on_open = function(term)
      keymap("t", "<esc>", function()
        term:toggle() -- esc키로 닫기
      end, opts)
    end,
  })
  node_server:toggle()
end
```

---

# Visual Selection에 관한 기능들

예를들어, Visual Selection을 하고 `:`을 입력하고 Visual 관련된 명령어 입력

```sh
# 3번 terminal로 보내짐
:'<,'>ToogleTermSendVisualSelection 3

# 1번 terminal로 보내짐
:'<,'>ToogleTermSendVisualSelection
```

curl로 여러가지 api를 테스트할때 주석처리하고 실행하던 방식보다 수월했음

---

# Alpha 대시보드로 작업환경 분리하기

```lua
return {
  {
    "goolord/alpha-nvim",
    dependencies = { "nvim-tree/nvim-web-devicons" },
    config = function()
      local vimwiki = require("devstefancho.vimwiki")
      if vimwiki.is_current_path_wiki() then -- vim.fn.getcwd로 wiki path인지 확인
        require("alpha").setup(require("devstefancho.ui.wiki-dashboard").config)
      else
        require("alpha").setup(require("devstefancho.ui.dashboard").config)
      end
    end,
    cond = require("devstefancho.plugins_status").plugins_status["alpha-nvim"],
  },
}
```

---

# Alpha 대시보드로 작업환경 분리하기

- 특정 환경에서 자주쓰는 명령어들을 등록해두기 좋음
- 단축어가 기억이 잘 안날때 자주쓰는 명령어만 등록하기 좋음
- 단축어 관리를 위해 which-key로 사용해보았으나 관리가 어려워서 사용하지 않고있음

| wiki                      | work                      |
| ------------------------- | ------------------------- |
| ![](/alpha-dash-wiki.png) | ![](/alpha-dash-work.png) |

---

# 가치관

- 내가 필요한만큼만 커스텀할 수 있는 환경
- 터미널과 가까운 환경
- 내가 지속적으로 개선할 수 있는 환경

---
