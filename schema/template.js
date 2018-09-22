export default `
  type Template {
    id: Int!
    owner: Profile!
    background: String!
    typographyColor: String!
    links: String!
    linksHover: String!
  }

  type CreateTemplate {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allTemplates: [Template!]!
  }

  type Mutation {
    createTemplate(background: String!, typographyColor: String!, links: String!, linksHover: String!): CreateTemplate!
  }
`;
