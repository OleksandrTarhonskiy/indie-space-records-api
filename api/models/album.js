export default (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'album',
    {
      name : DataTypes.STRING,
      year : DataTypes.STRING,
    },
    { underscored: true }
  );

  Album.associate = (models) => {
    Album.belongsTo(models.Musician, {
      foreignKey: 'author'
    });
  };

  return Album;
};
