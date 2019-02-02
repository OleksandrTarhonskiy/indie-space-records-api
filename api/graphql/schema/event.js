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
    address: String!
  }

  type CreateEvent {
    ok: Boolean!
    errors: [Error!]
  }

  type deleteEvent {
    ok: Boolean!
    errors: [Error!]
  }

  type updateEvent {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allMyEvents: [Event!]!
    viewEvent(eventId: Int!): Event!
    events(offset: Int!, profileId: Int!): [Event]!
  }

  type Mutation {
    createEvent(title: String!, details: String!, price: Float!, date: String!, country: String!, region: String!, address: String!): CreateEvent!
    updateEvent(eventId: Int!, title: String!, details: String!, price: Float!, date: String!, country: String!, region: String!, address: String!): updateEvent!
    deleteEvent(eventId: Int!): deleteEvent!
  }
`;
