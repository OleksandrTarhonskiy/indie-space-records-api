export default {
  Mutation: {
    createAlbum: async (parent, args, { models, user }) => {
      try {
        await models.Album.create({ ...args, author: user.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
