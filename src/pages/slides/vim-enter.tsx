import React, { useEffect, useState } from 'react'
import { HeadFC, PageProps, graphql } from 'gatsby'
import { Layout } from '@/components/layout'
import * as styles from './VimEnter.module.scss'

const PresentationVimEnter: React.FC<PageProps<Queries.slideMarkdownQuery>> = ({
  data,
}) => {
  const { allMarkdownRemark } = data
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const isHide =
    typeof window !== 'undefined' &&
    window.location.search.includes('hide=true')
  const node = allMarkdownRemark.nodes[0]
  const slides = node?.html?.split('<hr>') || []
  const currentSlide = slides[currentSlideIndex]
  const pageLength = slides.length

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        setCurrentSlideIndex((prev) => (prev === 0 ? 0 : prev - 1))
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        setCurrentSlideIndex((prev) =>
          prev >= pageLength - 1 ? pageLength - 1 : prev + 1
        )
      }
    }

    addEventListener('keydown', keyPressHandler)

    return () => {
      removeEventListener('keydown', keyPressHandler)
    }
  }, [pageLength])

  const [isLandScape, setIsLandScape] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(orientation: landscape)').matches
  })

  useEffect(() => {
    const handleResize = () => {
      setIsLandScape(window.matchMedia('(orientation: landscape)').matches)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!node?.frontmatter) return null

  return (
    <Layout hideNavigation>
      <div className={styles.content}>
        {currentSlide && (
          <div dangerouslySetInnerHTML={{ __html: currentSlide }} />
        )}
      </div>
      {!isHide && (
        <div
          className={
            isLandScape ? styles.buttonGroupForLandScape : styles.buttonGroup
          }
        >
          <button
            onClick={() => {
              setCurrentSlideIndex((prev) => (prev === 0 ? 0 : prev - 1))
            }}
          >
            prev
          </button>
          <button
            onClick={() => {
              setCurrentSlideIndex((prev) =>
                prev >= pageLength - 1 ? pageLength - 1 : prev + 1
              )
            }}
          >
            next
          </button>
        </div>
      )}
      <div className={styles.pageNumber}>{`${
        currentSlideIndex + 1
      } / ${pageLength} `}</div>
    </Layout>
  )
}

export default PresentationVimEnter

export const query = graphql`
  query slideMarkdown {
    allMarkdownRemark(filter: { frontmatter: { slug: { eq: "vim-enter" } } }) {
      nodes {
        frontmatter {
          title
          slug
        }
        html
      }
    }
  }
`

export const Head: HeadFC = () => <title>Home Page</title>
