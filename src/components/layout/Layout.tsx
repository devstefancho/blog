import React, { PropsWithChildren } from 'react'
import { Link } from 'gatsby'
import ThemeModeButton from './ThemeModeButton'
import * as styles from './Layout.module.scss'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={`container ${styles.container}`}>
      <nav>
        <Link to="/">
          <h1 className={styles.logo}>Stefan Cho</h1>
        </Link>
        <div className={styles.navRight}>
          {typeof window !== 'undefined' && <ThemeModeButton />}
          <Link to="/about" className={styles.aboutText}>
            ABOUT
          </Link>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  )
}

export default Layout
