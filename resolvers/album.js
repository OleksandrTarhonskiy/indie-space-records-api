export default {
  Mutation: {
    createAlbum: async (parent, args, { models, musician }) => {
      try {
        await models.Album.create({ ...args, author: musician.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
