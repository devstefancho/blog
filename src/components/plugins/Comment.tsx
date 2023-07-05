import React, { useEffect, useRef } from 'react'

const attribs = {
  repo: 'devstefancho/blog',
  'issue-term': 'pathname',
  label: 'comment',
  theme: 'preferred-color-scheme',
  crossorigin: 'anonymous',
}

/** @link https://utteranc.es/ */
export default function Comment() {
  const commentsEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scriptEl = document.createElement('script')
    scriptEl.async = true
    scriptEl.src = 'https://utteranc.es/client.js'
    Object.entries(attribs).forEach(([key, value]) => {
      scriptEl.setAttribute(key, value)
    })
    commentsEl.current?.appendChild(scriptEl)
  }, [])

  return <div ref={commentsEl} />
}
