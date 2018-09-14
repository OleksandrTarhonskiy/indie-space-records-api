import _           from 'lodash';

import { tryLogin } from '../auth';

const formatErrors = (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    return e.errors.map(x => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};

export default {
  Query: {
    getMusician: (parent, { id }, { models }) => models.Musician.findOne({ where: { id } }),
    allMusicians: (parent, args, { models }) => models.Musician.findAll(),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET),
    signUp: async (parent, args, { models }) => {
      try {
        const musician = await models.Musician.create(args);

        return {
          ok: true,
          musician,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
