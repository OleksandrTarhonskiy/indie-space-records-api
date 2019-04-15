import formatErrors from './errors';
import fs           from 'fs';

export default {
  Mutation: {
    createOrder: async (parent, {
      firstName,
      lastName,
      phoneNumber,
      email,
      city,
      deliveryAddress,
      deliveryType,
      country,
      zipCode,
      products
    }, { models, user }) => {
      try {
        const parsedProducts = JSON.parse(products);

        parsedProducts.map(p => {
          const params = {
            quantity: p.quantity,
            firstName,
            lastName,
            phoneNumber,
            email,
            city,
            deliveryAddress,
            deliveryType,
            country,
            zipCode,
          }

          return (models.Order.create({ ...params, owner : p.storeId, productId : p.id }));
        });

        return ({
          ok: true
        });
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
