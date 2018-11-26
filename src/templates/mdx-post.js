import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

export default props => (
  <React.Fragment>
    <h1>{props.data.mdx.frontmatter.title}</h1>
    <MDXRenderer>{props.data.mdx.code.body}</MDXRenderer>
  </React.Fragment>
);

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      code {
        body
      }
      frontmatter {
        title
      }
    }
  }
`;
