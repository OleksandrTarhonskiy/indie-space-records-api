export default `
  type Musician {
    id: Int!
    bandName: String!
    name: String!
    email: String!
    albums: [Album!]!
  }

  type Album {
    id: Int!
    year: String!
  }

  type Query {
    hi: String
  }
`;
