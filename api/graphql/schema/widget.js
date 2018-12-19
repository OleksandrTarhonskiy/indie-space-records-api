export default `
  type Widget {
    id: Int!
    section: Section!
    link: String!
    sectionId: Int!
  }

  type Query {
    allWidgets: [Widget!]!
  }

  type addWidget {
    ok: Boolean!
    errors: [Error!]
  }

  type deleteWidget {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    addWidget(sectionId: Int!, link: String!): addWidget!
    deleteWidget(widgetId: Int!): deleteWidget!
  }
`;
