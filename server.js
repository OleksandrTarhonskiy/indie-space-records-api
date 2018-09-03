const express        = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const bodyParser     = require('body-parser');

const PORT = 8080;

const schema = buildSchema(`
  type Query {
      message: String
  }
`);

const root = {
  message: () => 'Hello World!'
};

const app = express();

app.use('/graphql', express_graphql({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));
