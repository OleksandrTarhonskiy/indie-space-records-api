export default `
  type Section {
    id: Int!
    owner: Theme!
    name: String!
    type: String!
    style: String!
    content: String
  }

  type Query {
    allMySections: [Section!]!
  }

  type updateSectionStyle {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    crateSection(name: String!, type: String!, style: String!, content: String): Boolean!
    updateSectionStyle(sectionId: Int!, style: String!): updateSectionStyle!
  }
`;
