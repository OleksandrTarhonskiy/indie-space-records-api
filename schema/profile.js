export default `
  type Profile {
    owner: User!
    name: String!
    genres: String!
  }

  type CreateProfile {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createProfile(name: String!, genres: String!): CreateProfile!
  }
`;
