const goToPost = (slug?: Queries.MarkdownRemarkFrontmatter['slug']) => {
  return slug ? `/posts/${slug}` : '/'
}

export { goToPost }
