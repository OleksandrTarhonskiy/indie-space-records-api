import formatErrors from './errors';
import requiresAuth from '../permissions';

export default {
  Profile: {
    theme: async (parent, args, { models, user }) => {
      const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
      const theme = await models.Theme.findOne({ where: { owner: currentProfile.id } })
      return theme
    },
  },
  Query: {
    allProfiles: (parent, args, { models, user }) => models.Profile.findAll({ where: { owner: user.id } })
    },
  Mutation: {
    createProfile: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Profile.create({ ...args, owner: user.id });
        const userOwner = await models.User.findOne({ where: { id: user.id } });
        userOwner.hasProfile = true;
        userOwner.save();
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });

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
