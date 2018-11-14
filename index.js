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
import cors                                from 'cors';
import jwt                                 from 'jsonwebtoken';
import formidable                          from 'formidable';

import models                              from './api/models';
import { refreshTokens }                   from './auth';


const SECRET = 'draste';
const SECRET2 = 'drastepidkraste';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 8080;
const app = express();

app.use(cors('*'));

const addUser = async (req, res, next) => {
  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        res.set('x-token', newTokens.token);
        res.set('x-refresh-token', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

const uploadDir = 'files';
const fileMiddleware = (req, res, next) => {
  if (!req.is('multipart/form-data')) {
    return next();
  }
  const form = formidable.IncomingForm({
    uploadDir,
  });
  form.parse(req, (error, { operations }, files) => {
    if (error) {
      console.log(error);
    }
    const document = JSON.parse(operations);
    if (Object.keys(files).length) {
      const { file: { type, path: filePath } } = files;
      console.log(type);
      console.log(filePath);
      document.variables.file = {
        type,
        path: filePath,
      };
    }
    req.body = document;
    next();
  });
};

app.use(addUser);

const graphqlEndpoint = '/graphql';

app.use(
  graphqlEndpoint,
  bodyParser.json(),
  fileMiddleware,
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user,
      SECRET,
      SECRET2,
    },
  })),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync({}).then(() => {
  app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphiql`));
});
