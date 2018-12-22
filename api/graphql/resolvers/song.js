import formatErrors from './errors';
import requiresAuth from '../../permissions';

export default {
  Query: {
    allMySongs: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });
      const songs = await models.Song.findAll({ where: { profile_id: currentProfile.id } });

      return songs;
    }),
  },
  Mutation: {
    uploadSong: requiresAuth.createResolver(async (parent, { file, ...args }, { models, user }) => {
      try {
        const currentProfile = await models.Profile.findOne({ where: { owner: user.id } });

        const songData = args;

        if (file) {
          songData.filetype = file.type;
          songData.url = file.path;
        }

        await models.Song.create({ ...songData, profileId: currentProfile.id, });

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
