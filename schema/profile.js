export default `
  type Profile {
    id: Int!
    owner: User!
    name: String!
    genres: String!
    country: String!
    region: String!
    currency: String!
    theme: Theme!
    events: [Event!]
  }

  type CreateProfile {
    ok: Boolean!
    errors: [Error!]
  }

  type UptadeProfile {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    myProfile: Profile!
  }

  type Mutation {
    createProfile(name: String!, genres: String!, country: String!, region: String!, currency: String!): CreateProfile!
    updateProfile(profileId: Int!, name: String!, genres: String!, country: String!, region: String!, currency: String!): UptadeProfile!
  }
`;
