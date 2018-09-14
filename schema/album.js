export default `
  type Album {
    author: User!
    name: String!
    year: String!
  }

  type Mutation {
    createAlbum(name: String!, year: String!): Boolean!
  }
`;
