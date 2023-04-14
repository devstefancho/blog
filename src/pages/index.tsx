import * as React from 'react'
import { HeadFC, Link, PageProps, graphql } from 'gatsby'

const IndexPage: React.FC<PageProps<Queries.allMarkdownSlugQuery>> = ({
  data,
}) => {
  return (
    <main>
      <h1>Home Page</h1>
      {data.allMarkdownRemark.nodes.map((node) => (
        <div key={node?.frontmatter?.slug}>
          <Link to={`blog/${node?.frontmatter?.slug ?? '/'}`}>
            {node?.frontmatter?.title}
          </Link>
        </div>
      ))}
    </main>
  )
}

export default IndexPage

export const query = graphql`
  query allMarkdownSlug {
    allMarkdownRemark {
      nodes {
        frontmatter {
          slug
          title
        }
      }
    }
  }
`

export const Head: HeadFC = () => <title>Home Page</title>
