import formatErrors from './errors';
import requiresAuth from '../permissions';

export default {
  Mutation: {
    uploadSong: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { author: user.id } });

        const songData = args;

        if (file) {
          songData.filetype = file.type;
          songData.url = file.path;
        }

        const message = await models.Song.create({ ...songData, profileId: currentProfile.id, });

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
