import React, { useEffect, useState } from 'react'
import { HeadFC, PageProps, graphql } from 'gatsby'
import { Layout } from '@/components/layout'
import * as styles from './ToggleTermSlide.module.scss'

const ToggleTermSlide: React.FC<PageProps<Queries.slideMarkdownQuery>> = ({
  data,
}) => {
  const { allMarkdownRemark } = data
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const node = allMarkdownRemark.nodes[0]
  const slides = node?.html?.split('<hr>') || []
  const currentSlide = slides[currentSlideIndex]
  const pageLength = slides.length

  useEffect(() => {
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => (prev === 0 ? 0 : prev - 1))
      } else if (e.key === 'ArrowRight') {
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

  if (!node?.frontmatter) return null

  return (
    <Layout hideNavigation>
      <div className={styles.content}>
        {currentSlide && (
          <div dangerouslySetInnerHTML={{ __html: currentSlide }} />
        )}
      </div>
      <div className={styles.buttonGroup}>
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
    </Layout>
  )
}

export default ToggleTermSlide

export const query = graphql`
  query slideMarkdown {
    allMarkdownRemark(filter: { frontmatter: { slug: { eq: "toggleTerm" } } }) {
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
