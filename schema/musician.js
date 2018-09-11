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

  type RegisterResponse {
    ok: Boolean!
    musician: Musician
    errors: [Error!]
  }

  type LoginResponse {
    ok: Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    signUp(bandName: String!, name: String!, email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
  }
`;
