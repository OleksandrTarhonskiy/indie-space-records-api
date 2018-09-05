import bcrypt from 'bcrypt';
import _      from 'lodash';

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
    signUp: async (parent, { password, ...otherArgs }, { models }) => {
      try {
        if (password.length < 8 || password.length > 100) {
          return {
            ok: false,
            errors: [
              {
                path: 'password',
                message: 'The password needs to be between 8 and 100 characters long',
              },
            ],
          };
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const musician = await models.Musician.create({ ...otherArgs, password: hashedPassword });

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
