import formatErrors from './errors';
import fs           from 'fs';

export default {
  Mutation: {
    createOrder: async (parent, { firstName, lastName, quantity, phoneNumber, email, deliveryType, products }, { models, user }) => {
      try {
        const parsedProducts = JSON.parse(products);

        parsedProducts.map(p => {
          const params = {
            quantity: p.quantity,
            firstName,
            lastName,
            phoneNumber,
            email,
            deliveryType,
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
