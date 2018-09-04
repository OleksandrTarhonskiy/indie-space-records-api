export default `
  type Album {
    author: Musician!
    name: String!
    year: String!
  }

  type Mutation {
    createAlbum(name: String!, year: String!): Boolean!
  }
`;
