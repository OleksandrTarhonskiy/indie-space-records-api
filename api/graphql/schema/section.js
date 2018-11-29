export default `
  type Section {
    id: Int!
    owner: Theme!
    name: String!
    type: String!
    style: String!
    content: String
  }

  type Mutation {
    crateSection(name: String!, type: String!, style: String!, content: String): Boolean!
  }
`;
