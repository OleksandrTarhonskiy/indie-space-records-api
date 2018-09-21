import formatErrors from './errors';
import requiresAuth from '../permissions';

export default {
  Query: {
    allProfiles: requiresAuth.createResolver(async (parent, args, { models, user }) =>
      models.Profiles.findAll({ owner: user.id }, { raw: true })),
    },
  Mutation: {
    createProfile: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Profile.create({ ...args, owner: user.id });
        const userOwner = await models.User.findOne({ where: { id: user.id } })
        userOwner.hasProfile = true;
        userOwner.save()

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
