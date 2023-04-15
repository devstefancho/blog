import * as React from 'react'
import { HeadFC, Link, PageProps, graphql } from 'gatsby'
import * as styles from './index.module.scss'
import '../global.css'

const IndexPage: React.FC<PageProps<Queries.allMarkdownSlugQuery>> = ({
  data,
}) => {
  // select html and add attribute data-theme and value is light

  return (
    <main className="container">
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
      <h1>Stefan Cho</h1>
      <h2>Posts</h2>
      {data.allMarkdownRemark.nodes.map((node) => (
        <div key={node?.frontmatter?.slug}>
          <div className="warning">
            <div>
              <Link to={`blog/${node?.frontmatter?.slug ?? '/'}`}>
                {node?.frontmatter?.title}
              </Link>
            </div>
            <time className={styles.date}>
              <small>{node?.frontmatter?.date}</small>
            </time>
          </div>
          <p>{node?.excerpt}</p>
        </div>
      ))}
    </main>
  )
}

export default IndexPage

export const query = graphql`
  query allMarkdownSlug {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          slug
          title
          date
        }
        excerpt(pruneLength: 100)
      }
    }
  }
`

export const Head: HeadFC = () => <title>Home Page</title>
