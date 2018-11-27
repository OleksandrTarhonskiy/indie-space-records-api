import formatErrors from './errors';
import requiresAuth from '../../permissions';

export default {
  Query: {
    allMyProducts: requiresAuth.createResolver(async (parent, { searchQuery }, { models, user }) => {
      const profile = await models.Profile.findOne({ where: { owner: user.id } });
      let products = await models.Product.findAll({ where: { profileId: profile.id } });

      if (searchQuery) {
        products = products.filter(el => el.title.includes(searchQuery.toLowerCase()))
      }

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

    updateProduct: requiresAuth.createResolver(async (parent, { productId, type, title, price, inStock }, { models, user }
      ) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        const product = await models.Product.findOne({ where: { id: productId } });

        product.type = type;
        product.title = title;
        product.price = price;
        product.inStock = inStock;

        product.save();

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
