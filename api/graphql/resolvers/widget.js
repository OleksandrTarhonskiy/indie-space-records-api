import formatErrors from './errors';
import requiresAuth from '../../permissions';

export default {
  Query: {
    allWidgets: requiresAuth.createResolver(async (parent, args, { models }) => {
      const widgets = await models.Widget.findAll();

      return widgets;
    }),
  },
  Mutation: {
    addWidget: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Widget.create({ ...args });
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
