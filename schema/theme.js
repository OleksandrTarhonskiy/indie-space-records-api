export default `
  type Theme {
    id: Int!
    owner: Profile!
    name: String!
    value: String!
  }

  type CreateTheme {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allThemes: [Theme!]!
  }

  type Mutation {
    createTheme(name: String!, value: String!): CreateTheme!
  }
`;
