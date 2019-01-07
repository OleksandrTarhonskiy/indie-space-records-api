import formatErrors from './errors';
import requiresAuth from '../../permissions';

export default {
  Profile: {
    theme: async (parent, args, { models }) => await models.Theme.findOne({ where: { owner: parent.id } }),
    events: async (parent, args, { models }) => await models.Event.findAll({ where: { profileId: parent.id } }),
    products: async (parent, args, { models }) => await models.Product.findAll({
      where: { profileId: parent.id },
      order: [['created_at', 'DESC']],
      limit: 6,
    }),
  },
  Query: {
    myProfile: (parent, args, { models, user }) => models.Profile.findOne({ where: { owner: user.id } }),
    allProfiles: (parent, args, { models }) => models.Profile.findAll(),
    fetchProfile: async (parent, { profileId }, { models }) => await models.Profile.findOne({ where: { id: profileId } })
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
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    }),

    updateProfile: requiresAuth.createResolver(async (parent, { profileId, name, genres, country, region, currency }, { models, user }
      ) => {
      const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });

      currentProfile.name     = name;
      currentProfile.genres   = genres;
      currentProfile.country  = country;
      currentProfile.region   = region;
      currentProfile.currency = currency;

      const sameNameProfile = await models.Profile.findOne({ where: { name: name } });

      if (!sameNameProfile || (sameNameProfile.id === currentProfile.id)) {
        currentProfile.save();
      } else {
        return {
          ok: false,
          errors: [{ path: 'name', message: 'name must be unique' }],
        };
      }

      return ({
        ok: true
      });
    }),
  },
};
