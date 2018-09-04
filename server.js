import express                             from 'express';
import bodyParser                          from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema }            from 'graphql-tools';
import path                                from 'path';
import {
  fileLoader,
  mergeTypes,
  mergeResolvers
}                                          from 'merge-graphql-schemas';

import models from './api/models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 8080;

const app = express();

const graphqlEndpoint = '/graphql';

app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync({}).then(() => {
  app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphiql`));
});
