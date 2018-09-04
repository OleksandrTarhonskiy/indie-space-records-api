export default `
  type Musician {
    id: Int!
    bandName: String!
    name: String!
    email: String!
    albums: [Album!]!
  }

  type Query {
    getMusician(id: Int!): Musician!
    allMusicians: [Musician!]!
  }

  type Mutation {
    createMusician(bandName: String!, name: String!, email: String!, password: String!): Musician!
  }
`;
