import path from 'path'

import { CreateWebpackConfigArgs } from 'gatsby'

const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  })
}

export { onCreateWebpackConfig }
