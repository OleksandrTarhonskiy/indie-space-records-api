import formatErrors from './errors';
import requiresAuth from '../permissions';

export default {
  Mutation: {
    createProduct: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });

        await models.Product.create({ ...args, profileId: currentProfile.id, });

        return ({
          ok: true
        });
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),
  },
};
