export default `
  type Widget {
    id: Int!
    section: Section!
    type: String!
    link: String!
  }

  type addWidget {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    addWidget(sectionId: Int!, type: String!, link: String!): addWidget!
  }
`;
