export default `
  type Product {
    id: Int!
    owner: Profile!
    type: String!
    title: String!
    desc: String!
    price: Float!
    deliveryType: String!
    inStock: Boolean!
  }

  type Query {
    allMyProducts: [Product!]!
  }

  type createProduct {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createProduct(type: String!, title: String!, desc: String!, price: Float!, deliveryType: String!): createProduct!
  }
`;
