import * as React from 'react'
import { HeadFC, Link, PageProps, graphql } from 'gatsby'
import '../global.css'
import { Layout } from '@/components/layout'
import * as styles from './index.module.scss'

const IndexPage: React.FC<PageProps<Queries.allMarkdownSlugQuery>> = ({
  data,
}) => {
  return (
    <Layout>
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
    </Layout>
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
