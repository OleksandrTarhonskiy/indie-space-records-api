export default `
  type Song {
    id: Int!
    author: Profile!
    name: String!
    price: Float!
    url: String
    filetype: String
  }

  input File {
    type: String!,
    path: String!,
  }

  type Mutation {
    uploadSong(name: String!, price: Float!, file: File): Boolean!
  }
`;
