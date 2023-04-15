import React, { PropsWithChildren } from 'react'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      <nav>
        <button
          onClick={() => {
            window.document.documentElement.setAttribute('data-theme', 'light')
          }}
        >
          Light
        </button>
        <button
          onClick={() => {
            window.document.documentElement.setAttribute('data-theme', 'dark')
          }}
        >
          Dark
        </button>
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default Layout
