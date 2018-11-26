const path = require('path');
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      posts: allFile(
        filter: { relativePath: { glob: "posts/**/*.mdx" } }
        sort: { fields: relativePath, order: DESC }
      ) {
        edges {
          node {
            childMdx {
              code {
                scope
              }
              frontmatter {
                title
                slug
              }
            }
          }
        }
      }
    }
  `);

  const posts = result.data.posts.edges.map(({ node }) => node);

  posts.forEach(post => {
    if (
      !post.childMdx ||
      !post.childMdx.frontmatter ||
      !post.childMdx.frontmatter.slug
    ) {
      console.log(post);
      throw Error('All posts require a `slug` field in the frontmatter.');
    }

    const { slug } = post.childMdx.frontmatter;

    createPage({
      path: slug,
      component: componentWithMDXScope(
        path.resolve('./src/templates/mdx-post.js'),
        post.childMdx.code.scope
      ),
      context: {
        slug
      }
    });
  });
};
