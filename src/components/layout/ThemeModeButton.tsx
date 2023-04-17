import React, { useLayoutEffect, useState } from 'react'
import { Moon, Sun } from '@/components/icon'
import * as styles from './ThemeModeButton.module.scss'

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const ThemeModeButton = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? Theme.Dark
      : Theme.Light
    const localStorageTheme =
      localStorage.getItem('devstefancho-theme') === Theme.Dark
        ? Theme.Dark
        : Theme.Light
    return localStorageTheme || systemTheme
  })

  useLayoutEffect(() => {
    window.document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleClick = (value: Theme) => {
    localStorage.setItem('devstefancho-theme', value)
    setTheme(value)
  }

  return (
    <div className={styles.container}>
      {theme === 'dark' ? (
        <Sun onClick={() => handleClick(Theme.Light)} />
      ) : (
        <Moon onClick={() => handleClick(Theme.Dark)} />
      )}
    </div>
  )
}

export default ThemeModeButton
