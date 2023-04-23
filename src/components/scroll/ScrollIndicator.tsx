import React, { useEffect, useState } from 'react'

const ScrollIndicator = () => {
  const [translateX, setTranslateX] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const winScroll = window.scrollY
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const move = (winScroll / height) * 100

      setTranslateX(move)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: '-100%',
        width: '100%',
        height: 3,
        background: 'var(--contrast)',
        zIndex: 99,
        transform: `translateX(${translateX}%)`,
      }}
    ></div>
  )
}

export { ScrollIndicator }
