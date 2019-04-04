import formatErrors from './errors';
import fs           from 'fs';

export default {
  Mutation: {
    createOrder: async (parent, args, { models, user }) => {
      try {
        console.log(args);

        console.log(JSON.parse(args.products))

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
