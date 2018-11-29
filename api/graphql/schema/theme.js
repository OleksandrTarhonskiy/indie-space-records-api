export default `
  type Theme {
    id: Int!
    owner: Profile!
    name: String!
    style: String!
    fonts: String!
    sections: [Section!]
  }

  type CreateTheme {
    ok: Boolean!
    errors: [Error!]
  }

  type updateTheme {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allThemes: [Theme!]!
  }

  type Mutation {
    createTheme(name: String!, style: String!, fonts: String!): CreateTheme!
    updateTheme(style: String!, fonts: String!): updateTheme!
  }
`;
