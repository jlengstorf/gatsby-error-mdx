module.exports = {
  siteMetadata: {
    title: 'Gatsby MDX Error'
  },
  plugins: [
    'gatsby-mdx',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: 'content'
      }
    }
  ]
};
