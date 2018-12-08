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

  type crateSection {
    ok: Boolean!
    errors: [Error!]
  }

  type updateSectionStyle {
    ok: Boolean!
    errors: [Error!]
  }

  type updateSectionContent {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createSection(name: String!, type: String!, style: String!, content: String): crateSection!
    updateSectionStyle(sectionId: Int!, style: String!): updateSectionStyle!
    updateSectionContent(sectionId: Int!, type: String, name: String, content: String): updateSectionContent!
  }
`;
