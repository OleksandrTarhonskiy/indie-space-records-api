export default `
  type Widget {
    id: Int!
    sectionId: Section!
    type: String!
    link: String!
  }

  type addWidget {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    addWidget(type: String!, link: String!): addWidget!
  }
`;
