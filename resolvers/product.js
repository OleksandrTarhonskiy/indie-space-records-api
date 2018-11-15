import formatErrors from './errors';
import requiresAuth from '../permissions';

export default {
  Query: {
    allMyProducts: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      const profile = await models.Profile.findOne({ where: { owner: user.id } });
      const products = await models.Product.findAll({ where: { profileId: profile.id } });

      return products;
    }),
  },
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
