import React, { PropsWithChildren } from 'react'
import ThemeModeButton from './ThemeModeButton'
import * as styles from './Layout.module.scss'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={`container ${styles.container}`}>
      <nav>
        <h1 className={styles.logo}>Stefan Cho</h1>
        {typeof window !== 'undefined' && <ThemeModeButton />}
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default Layout
