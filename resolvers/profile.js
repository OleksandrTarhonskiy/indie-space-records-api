import formatErrors from './errors';

export default {
  Mutation: {
    createProfile: async (parent, args, { models, user }) => {
      try {
        await models.Profile.create({ ...args, owner: user.id });
        return {
          ok: true,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
  },
};
