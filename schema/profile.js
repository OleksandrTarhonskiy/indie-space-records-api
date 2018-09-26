export default `
  type Profile {
    id: Int!
    owner: User!
    name: String!
    genres: String!
    themes: [Theme!]!
  }

  type CreateProfile {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allProfiles: [Profile!]!
  }

  type Mutation {
    createProfile(name: String!, genres: String!): CreateProfile!
  }
`;
