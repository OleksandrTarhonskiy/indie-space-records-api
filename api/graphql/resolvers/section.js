import formatErrors from './errors';
import requiresAuth from '../../permissions';

export default {
  Query: {
    allMySections: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
      const currentTheme = await models.Theme.findOne({ where: { owner: currentProfile.id } });
      const sections = await models.Section.findAll({ where: { themeId: currentTheme.id }, order: [['id', 'ASC']] });

      return sections;
    }),
  },
  Mutation: {
    createSection: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        const currentTheme = await models.Theme.findOne({ where: { owner: currentProfile.id } });
        await models.Section.create({ ...args, themeId: currentTheme.id });

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

    updateSectionContent: requiresAuth.createResolver(async (parent, { sectionId, type, name, content }, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        const currentTheme = await models.Theme.findOne({ where: { owner: currentProfile.id } });
        const section = await models.Section.findOne({ where: { id: sectionId, themeId: currentTheme.id } });

        section.type    = type;
        section.name    = name;
        section.content = content;
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

    deleteSection: requiresAuth.createResolver(async (parent, { sectionId }, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        const currentTheme = await models.Theme.findOne({ where: { owner: currentProfile.id } });
        await models.Section.destroy({ where: { id: sectionId, themeId: currentTheme.id } });

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
