export default `
  type Order {
    id: Int!
    profile: Profile!
    product: Product!
    quantity: Int!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!
    city: String!
    deliveryType: String!
    deliveryAddress: String!
    country: String!
    zipCode: String!
  }

  type createOrder {
    ok: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createOrder(products: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    email: String!
    city: String!
    deliveryType: String!
    deliveryAddress: String!
    country: String!
    zipCode: String!): createOrder!
  }
`;
