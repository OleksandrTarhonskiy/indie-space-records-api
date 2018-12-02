import formatErrors from './errors';
import requiresAuth from '../../permissions';

export default {
  Theme: {
    sections: async (parent, args, { models, user }) => await models.Section.findAll({ where: { themeId: parent.id } })
  },
  Mutation: {
    createTheme: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        const theme          = await models.Theme.findOne({ where: { owner: currentProfile.id } });

        const createThemeWithSections = async () => {
          await models.Theme.create({ ...args, owner: currentProfile.id });

          const currentTheme = await models.Theme.findOne({ where: { owner: currentProfile.id } });
          const styles       = JSON.parse(currentTheme.style);

          styles.sections.map(section => {
            const params = {
              name     : section.name,
              type     : section.type,
              style    : JSON.stringify(section.style),
              constent : section.content,
            };

            return ( models.Section.create({ ...params, themeId: currentTheme.id }) )
          })

          let basicThemeStyle = JSON.parse(currentTheme.style)
          delete basicThemeStyle.sections;
          currentTheme.style = JSON.stringify(basicThemeStyle.basicStyles);
          currentTheme.save();
        }

        if (theme) {
          await models.Section.destroy({ where: { themeId: theme.id } })
          theme.destroy();
          createThemeWithSections();
        } else {
          createThemeWithSections();
        }

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
