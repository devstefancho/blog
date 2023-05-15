import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import * as styles from './index.module.scss'

const Series = () => {
  const data = useStaticQuery<Queries.ReactDocsSeriesQuery>(graphql`
    query ReactDocsSeries {
      allMarkdownRemark(
        filter: { frontmatter: { series: { eq: "react-docs" } } }
      ) {
        nodes {
          frontmatter {
            title
            slug
          }
          excerpt(pruneLength: 30)
        }
      }
    }
  `)

  return (
    <section>
      <h2>React 공식문서 시리즈</h2>
      {data.allMarkdownRemark.nodes.map((node) => (
        <Link
          key={node.frontmatter?.slug}
          to={`blog/${node?.frontmatter?.slug ?? '/'}`}
        >
          <div className={styles.card}>
            <h3>{node?.frontmatter?.title}</h3>
            <p>{node?.excerpt}</p>
          </div>
        </Link>
      ))}
    </section>
  )
}

export default Series
