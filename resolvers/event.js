import formatErrors from './errors';
import requiresAuth from '../permissions';

export default {
  Query: {
    allMyEvents: async (parent, args, { models, user }) => {
        const myProfile = await models.Profile.findOne({ where: { owner: user.id } });
        const myEvents = await models.Event.findAll({ where: { profileId: myProfile.id } });

        return myEvents;
      },

    viewEvent: async (parent, { eventId }, { models }) => {
        const event = await models.Event.findOne({ where: { id: eventId } });

        return event
      },
    },
  Mutation: {
    createEvent: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        await models.Event.create({ ...args, profileId: currentProfile.id });

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

    deleteEvent: requiresAuth.createResolver(async (parent, { eventId }, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
        await models.Event.destroy({ where: { id: eventId } });

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
