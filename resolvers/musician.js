export default {
  Query: {
    getMusician: (parent, { id }, { models }) => models.Musician.findOne({ where: { id } }),
    allMusicians: (parent, args, { models }) => models.Musician.findAll(),
  },
  Mutation: {
    createMusician: (parent, args, { models }) => models.Musician.create(args),
  },
};
