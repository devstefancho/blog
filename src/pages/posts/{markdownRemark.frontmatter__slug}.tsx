import React from 'react'
import { PageProps, graphql } from 'gatsby'
import { Layout } from '@/components/layout'
import { ScrollIndicator } from '@/components/scroll/ScrollIndicator'

export default function BlogPostTemplate({
  data,
}: PageProps<Queries.markdownTestQuery>) {
  const { markdownRemark } = data

  return (
    <Layout>
      <ScrollIndicator />
      <article>
        <h1>{markdownRemark?.frontmatter?.title}</h1>
        <time dateTime={markdownRemark?.frontmatter?.date ?? ''}>
          {markdownRemark?.frontmatter?.date}
        </time>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark?.html ?? '' }} />
      </article>
    </Layout>
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
