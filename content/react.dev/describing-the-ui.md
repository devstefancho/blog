---
slug: 'describing-the-ui'
date: '2023-04-10'
title: 'Describing The UI'
---

# Your First Component

## Components: UI building blocks

React -> markup, CSS, javascript를 custom components로 combine해주는 것, 또한 reusable 하다.

## Defining a component

### JSX

React component는 단지 javascript 함수이다.
단, 반드시 capital letter로 시작해야한다.
markup이 return 되는 부분 syntax를 JSX라고 부른다.

```tsx
export default function Gallery() {
  return (
    <section>
      <h1>Amazing</h1>
      <Profile />
    </section>
  )
}
```

## Using Component

section은 lowercase로 시작하므로 HTML tag인 것으로 React가 알고 있다.
Profile은 capital P로 시작하므로 Component를 사용하려는 의도를 React가 알고 있다.

### 명명법

Gallery를 parent component
Profile을 child 라고 부른다.

### Component defintion

Component는 최상위로 위치해라 (같은 파일에 두는건 상관없다.)
Component는 다른 component를 render할 수 있지만, definition을 nest하지마라. (성능상에 문제, 버그 발생할 수 있다.)

```tsx
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}

export default function Gallery() {
  // ...
}

// ✅ Declare components at the top level
function Profile() {
  // ...
}
```

# Importing and Exporting Components

## The root component file

보통 CRA로 만들면 src/App.js가 "root component"일 것이다.
Nextjs처럼 file-based routing framework를 사용하면 root component는 page마다 다를것이다.

## Exporting and importing a component

export는 named export, default export 두개의 방식이 있다.
3가지 방식이 있다.

- one default export (보통 파일하나에 하나의 export가 있는 경우)
- multiple named exports
- named export(s) and one default export

뭐를 사용하던 상관없다. 다만 meaningful name을 사용하고,
다만 `export default () => {}` 처럼 이름이 없는건 discourage 이다. (debugging을 어렵게 만들기 때문)

import 할때는 './Gallery.js' or './Gallery' 둘중에서 아무거나 사용해도 되는데
'./Gallery.js' 방식이 [native ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)가 동작하는것에 가깝다

potential confusion을 줄이기 위해서 어떤팀들은 한개의 스타일을 정한다.

## Exporting and importing multiple components from the same file

# Writing Markup with JSX

JSX is a syntax extension for Javascript that lets you write HTML-like markup inside a Javascript file

## JSX: Putting markup into Javascript

rendering 로직이 group되어 있는 이유
과거에는 content(HTML), design(CSS), logic(Javascript)으로 분리되어 있었다.
현재는 logic이 content를 만들게 되면서 javascript안에 markup을 넣는게 효율적이게 되었다.
이것 때문에 JSX가 나온것인데, HTML보다 좀더 strict하고, dynamic information을 표현할 수 있다.
(strict 하다는 것은 close tag가 반드시 필요한 것으로 예를 들 수 있음)

JSX(syntax extension)와 React(javascript library)는 다른 concept 이다.
JSX를 사용하지 않더라도 아래처럼 React를 사용할 수 있다.

```javascript
import React from 'react'

const App = () => {
  return React.createElement('div', null, 'Hello, World!')
}

export default App
```

## Converting HTML to JSX

jsx는 single parent tag로 감싸야한다.
jsx는 HTML처럼 보이지만, 사실은 javascript object로 변환되는 것이다.
function의 return은 하나의 object만 가능하다.
여러개의 object를 리턴하려면 array에 object들을 넣어서 return 해야한다.
이게 바로 하나의 tag로만 return이 가능한 이유이다.

## The Rules of JSX

jsx는 explict하게 close tag가 필요하다.

jsx에서 attribute는 javascript object의 key로 들어간다.
javascript에서는 `-`를 변수명으로 사용할 수 없다. 그래서 대부분의 attribute는 camelCase를 사용하게 된 것이다. (ex. `strokeWidth`)
그리고 class같이 reserved word 또한 사용할 수 없다. (ex. `className`)
다만 `aria-*`, `data-*`는 historical reason들로 인해서 HTML과 똑같이 사용한다.

# Javascript in JSX with Curly Braces

javascript 로직을 markup 사이에 넣고 싶은 경우가 있는데 그때 curly braces를 사용한다. (아래예시)
이것을 자바스크립트 창을 연다고 표현한다. (open a window to Javascript)
중괄호 사이에서는 표현식(expression)만 사용이 가능하다.

## Passing strings with quotes

markup 내에서 curly brace를 사용할 수 있다.
(attribute부분에서 `=` 다음에 사용)

```tsx
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg'
  const description = 'Gregorio Y. Zara'
  return <img className="avatar" src={avatar} alt={description} />
}
```

## Using curly braces: A window into the Javscript world

jsx내에서 curly brace를 사용할 수 있다.

```tsx
<h1>{name}'s TODO</h1>
```

## Using "double curlies": CSS and other objects in JSX

obejct를 넘길때는 `{{}}`가 필요하다.

## More fun with Javascript objects and curly braces

하나의 object에 expression들을 넣어놓고 꺼내쓰는 방식도 있다.

```tsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink',
  },
}

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  )
}
```

# Passing Props to a Component

## Familiar props

props는 HTML의 attribute라고 생각하면 된다.
ReactDOM conforms to the [HTML standard](https://html.spec.whatwg.org/multipage/embedded-content.html#the-img-element)

## Passing props to a component

Parent Component는 props을 pass 하고
Child Component는 props를 read 한다.
React Component function은 props라는 single argument를 받는다. props는 object이다.
props를 read할 때는 destructing syntax를 사용하자.

## Specifying a default value for a prop

```tsx
function Avatar({ person, size = 100 }) {
  // ...
}
```

default props는 missing, undefined(`size={undefined}`) 두가지 상황에서만 사용된다.
null이나 0을 pass하면 사용되지 않는다.

## Forwarding props with the JSX spread syntax

JSX에서 spread syntax로 props를 넘기는 것을 Forwarding props라고 한다.
반복적인 것을 줄일때 간결함을 주고자 할 때는 좋지만, 제한적으로 사용해야 한다.
모든 컴포넌트에 적용하면 뭔가 잘못될 수가 있다. Forwarding을 해야하는 상황은 컴포넌트를 나누거나 children으로 넘겨야한다는 신호이다.

## Passing JSX as children

children으로 넘기는 건 flexible pattern 으로 사용하고자 할때이다.
parent 입장에서는 뭐가 들어가는지 알 필요가 없다.
children prop은 visual wrappers(panel, grids 등)에서 종종 사용한다.

## How props change over time

props는 immutable 이다. (unchangeable)
컴포넌트가 사용자 상호작용이나 새로운 데이터에 대한 응답으로 props를 변경해야하는 경우,
props를 변경해야할 때는 parent component에게 새로운 객체 전달을 요청 해야한다.
(같은 값이라도 항상 새로운 props를 받는 것이기 때문에 랜더링을 최소화하기 위해서 memo 같은 것을 사용하는 듯)
props는 읽기 전용이다.(read-only snapshots)

parent component는 different props를 내려줄 것이고, old props는 다른곳으로 보내졌다가 javascript engine에 의해 memory에서 제거된다.
props는 읽기 전용이다. 즉 랜더링 할때마다 새로운 버전의 props를 받는 것이다.
