export default `
  type Event {
    id: Int!
    band: Profile!
    title: String!
    details: String!
    price: Float!
    date: String!
    country: String!
    region: String!
  }

  type CreateEvent {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allMyEvents: [Event!]!
  }

  type Mutation {
    createEvent(title: String!, details: String!, price: Float!, date: String!, country: String!, region: String!): CreateEvent!
  }
`;
