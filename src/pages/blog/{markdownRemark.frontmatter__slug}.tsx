import React from 'react'
import { Link, PageProps, graphql } from 'gatsby'
import './styles.css'

export default function BlogPostTemplate({
  data,
}: PageProps<Queries.markdownTestQuery>) {
  const { markdownRemark } = data
  return (
    <div>
      <Link to="/">Go To Home</Link>
      <article>
        <h1>{markdownRemark?.frontmatter?.title}</h1>
        <time dateTime={markdownRemark?.frontmatter?.date ?? ''}>
          {markdownRemark?.frontmatter?.date}
        </time>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark?.html ?? '' }} />
      </article>
    </div>
  )
}

export const pageQuery = graphql`
  query markdownTest($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
