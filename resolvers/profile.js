import formatErrors from './errors';
import requiresAuth from '../permissions';

export default {
  // Profile: {
  //   templates: async (parent, args, { models, user }) => {
  //     const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
  //     const template = await models.Template.findAll({ where: { owner: currentProfile.id } })
  //     return template
  //   },
  // },
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
        // await models.Template.create({ ...args, owner: currentProfile.id });

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
