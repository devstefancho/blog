---
slug: vim-enter
date: '2023-12-15'
title: 'toggleTerm / Alpha'
---

# 안녕하세요

| ## _**About Me**_                                        |
| -------------------------------------------------------- |
| Frontend Developer (Web)                                 |
| Typescript, Lua                                          |
| Vim(+3y), Neovim(+1y)                                    |
| _<a>github.com/devstefancho</a>_ (dev-stefan-cho 조성진) |

---

# 목차

1. 커스텀 터미널 생성하기 with toggleTerm.nvim

2. 환경에 따른 대시보드 바꾸기 with alpha-nvim

3. 개발환경에 대한 생각

---

# :help toggleterm-why?

> _I find that I often want to set a process going and leave it to continue to run in the background._ > _I also sometimes want to create a new terminal and run a few commands._ > _I also want my terminal to look different from non-terminal buffers,_

- 백그라운드에 두고 싶고,

- 새로운 터미널을 생성해서 특정 명령어를 실행하고 싶고,

- 터미널이 다른 버퍼와 다른 UI이면 좋겠고,

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

# 서버실행 전용 터미널을 만들자

각 프레임워크마다 서버기동 명령어 예시

| 프레임워크          | 명령어                       |
| ------------------- | ---------------------------- |
| Nextjs (Typescript) | `yarn dev`                   |
| Spring Boot (Java)  | `./gradlew bootRun`          |
| Django (Python)     | `python manage.py runserver` |

---

# YarnDev용 terminal

1. `:YarnDev` 로 터미널을 연다
1. `yarn dev`를 입력한다
1. `esc`로 닫는다

## 원하는 조건

터미널 토글로는 YarnDev용 터미널이 열리지 않아야함

---

# YarnDev용 terminal - 설정

```lua
function _Node_term_toggle()
  local opts = { buffer = 0 }
  local node_term = Terminal:new({
    hidden = true,
    count = 5,
    direction = "float",
    on_open = function(term)
      keymap("t", "<esc>", function()
        term:toggle()
      end, opts)
    end,
  })
  node_term:toggle()
end


vim.api.nvim_create_user_command("YarnDev", _Node_term_toggle, {})
```

---

# YarnDev용 terminal - 설정

```lua
function _Node_term_toggle()
  local opts = { buffer = 0 }
  local node_term = Terminal:new({
    hidden = true, -- 기본 ToggleTerm 명령에 의해서 토글되지 않음
    count = 5, -- 터미널 고유번호
    direction = "float", -- 레이아웃 (float, vertical, horizontal)
    on_open = function(term)
      keymap("t", "<esc>", function()
        term:toggle() -- esc키로 닫기
      end, opts)
    end,
  })
  node_term:toggle()
end

-- 커맨드모드에서 YarnDev로 실행
vim.api.nvim_create_user_command("YarnDev", _Node_term_toggle, {})
```

---

# YarnDev용 terminal - Showcase

<video controls>
<source src="/yarn-dev-video.mov" type="video/mp4" />
</video>

---

# Jira-cli 활용하기 - 설정

```lua
function _Jira_history_toggle()
  local opts = { buffer = 0 }
  local jira_term = Terminal:new({
    hidden = true, -- 기본 ToggleTerm 명령에 의해서 토글되지 않음
    count = 6, -- 터미널 고유번호
    direction = "float", -- 레이아웃 (float, vertical, horizontal)
    on_open = function(term)
      keymap("t", "<esc>", function()
        term:toggle() -- esc키로 닫기
      end, opts)
      vim.fn.chansend(term.job_id, "jhistory\n")
    end,
  })
  jira_term:toggle()
end

-- 커맨드모드에서 JiraHistory로 실행
vim.api.nvim_create_user_command("JiraHistory", _Jira_history_toggle, {})
```

---

# Jira-cli 활용하기 - 결과

![](/jira-cli-history.png)

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

      -- vim.fn.getcwd로 wiki path인지 확인하여 dashboard 분기
      if vimwiki.is_current_path_wiki() then
        -- vimwiki용 dashboard
        require("alpha").setup(require("devstefancho.ui.wiki-dashboard").config)
      else
        -- ui용 dashboard
        require("alpha").setup(require("devstefancho.ui.dashboard").config)
      end

    end,
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

# 개발환경에 대해 생각하는 것

- 터미널과 가까운 환경
- 내가 필요한만큼만 커스텀할 수 있는 환경
- 내가 지속적으로 스스로 개선할 수 있는 환경
- 개발할수록 즐거움을 주는 환경
