import formatErrors from './errors';
import requiresAuth from '../permissions';

export default {
  Mutation: {
    createTheme: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        await models.Theme.create({ ...args, owner: currentProfile.id });

        return ({
          ok: true
        });
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    }),

    updateTheme: requiresAuth.createResolver(async (parent, { style, fonts }, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        const theme = await models.Theme.findOne({ where: { owner: currentProfile.id } });

        theme.style = style;
        theme.fonts = fonts;
        theme.save();

        return ({
          ok: true
        });
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    }),
  },
};
