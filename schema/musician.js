export default `
  type Musician {
    id: Int!
    bandName: String!
    name: String!
    email: String!
    albums: [Album!]!
  }
`;
