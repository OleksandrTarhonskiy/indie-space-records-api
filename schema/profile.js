export default `
  type Profile {
    id: Int!
    owner: User!
    name: String!
    genres: String!
    country: String!
    region: String!
    theme: Theme!
    events: [Event!]
  }

  type CreateProfile {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allProfiles: [Profile!]!
  }

  type Mutation {
    createProfile(name: String!, genres: String!, country: String!, region: String!): CreateProfile!
  }
`;
