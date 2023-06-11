import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import ThemeModeButton from './ThemeModeButton'
import * as styles from './Layout.module.scss'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    setShowButton(true)
  }, [])

  return (
    <>
      <nav className={`container-fluid ${styles.nav}`}>
        <ul>
          <li>
            <Link to="/" className={styles.logo}>
              Stefan Cho
            </Link>
          </li>
        </ul>
        <ul>
          <li className={styles.navRight}>
            {showButton && <ThemeModeButton />}
          </li>
          <li>
            <Link to="/about" className={styles.aboutText}>
              ABOUT
            </Link>
          </li>
        </ul>
      </nav>
      <main className="container">{children}</main>
    </>
  )
}

export default Layout
