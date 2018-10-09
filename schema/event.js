export default `
  type Event {
    id: Int!
    band: Profile!
    title: String!
    details: String!
    price: Float!
    country: String!
    region: String!
  }

  type CreateEvent {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allEvents: [Event!]!
  }

  type Mutation {
    CreateEvent(title: String!, details: String!, price: Float!, country: String!, region: String!): CreateEvent!
  }
`;
