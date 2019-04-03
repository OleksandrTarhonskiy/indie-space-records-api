import formatErrors from './errors';
import requiresAuth from '../../permissions';
import fs           from 'fs';

export default {
  Mutation: {
    createOrder: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        console.log(args);

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
