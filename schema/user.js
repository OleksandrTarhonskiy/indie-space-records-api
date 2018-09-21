export default `
  type User {
    id: Int!
    bandName: String!
    name: String!
    email: String!
    albums: [Album]
    profile: Profile
    hasProfile: Boolean!
  }

  type Query {
    me: User!
    allUsers: [User!]!
  }
  
  type RegisterResponse {
    ok: Boolean!
    user: User
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
    updateUser(id: Int!, hasProfile: Boolean!): User!
  }
`;
