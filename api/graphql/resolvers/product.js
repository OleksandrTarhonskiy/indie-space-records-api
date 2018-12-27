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

    viewProduct: async (parent, { productId }, { models }) => await models.Product.findOne({ where: { id: productId } })
  },
  Mutation: {
    createProduct: requiresAuth.createResolver(async (parent, { file, ...args }, { models, user }) => {
      if (args.price < 0) {
        return {
          ok: false,
          errors: [{ path: 'price', message: 'Price must be greater than 0' }],
        };
      }

      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });

        const productData = args;

        if (file) {
          if (file.type.startsWith('image/')) {
            productData.filetype = file.type;
            productData.url      = file.path;

            await models.Product.create({ ...productData, profileId: currentProfile.id, });
          } else {
            return {
              ok: false,
              errors: [{ path: 'upload', message: 'Wrong filetype' }],
            };
          }
        }

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

    updateProduct: requiresAuth.createResolver(async (parent, { productId, type, title, price, inStock, file }, { models, user }
      ) => {
      if (price < 0) {
        return {
          ok: false,
          errors: [{ path: 'price', message: 'Price must be greater than 0' }],
        };
      }

      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        const product = await models.Product.findOne({ where: { id: productId } });

        product.type = type;
        product.title = title;
        product.price = price;
        product.inStock = inStock;

        if (file) {
          if (file.type.startsWith('image/')) {
            product.filetype = file.type;
            product.url      = file.path;
          } else {
            return {
              ok: false,
              errors: [{ path: 'upload', message: 'Wrong filetype' }],
            };
          }
        }

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
