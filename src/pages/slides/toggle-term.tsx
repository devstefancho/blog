import React, { useEffect, useState } from 'react'
import {
  HeadFC,
  // Link,
  PageProps,
  graphql,
} from 'gatsby'
import { Layout } from '@/components/layout'
import * as styles from './ToggleTermSlide.module.scss'

const ToggleTermSlide: React.FC<PageProps<Queries.slideMarkdownQuery>> = ({
  data,
}) => {
  const { allMarkdownRemark } = data
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
  const slide = allMarkdownRemark.nodes.find(
    (n) => n.frontmatter?.index === currentSlideIndex
  )
  const pageLength = allMarkdownRemark.nodes.length

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

  if (!slide?.frontmatter) return null

  return (
    <Layout hideNavigation>
      <div className={styles.content}>
        <h1>{slide.frontmatter.title}</h1>

        {slide?.html && (
          <div dangerouslySetInnerHTML={{ __html: slide.html }} />
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
    allMarkdownRemark(
      filter: { frontmatter: { slug: { regex: "/toggleTerm-[0-9]+/" } } }
    ) {
      nodes {
        frontmatter {
          title
          slug
          index
        }
        html
      }
    }
  }
`

export const Head: HeadFC = () => <title>Home Page</title>
