import formatErrors from './errors';
import requiresAuth from '../../permissions';

export default {
  Mutation: {
    updateSectionStyle: requiresAuth.createResolver(async (parent, { sectionId, style }, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        const currentTheme = await models.Theme.findOne({ where: { owner: currentProfile.id } });
        const section = await models.Section.findOne({ where: { id: sectionId, themeId: currentTheme.id } });

        section.style = style;
        section.save();

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
