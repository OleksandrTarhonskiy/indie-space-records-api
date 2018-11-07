export default (sequelize, DataTypes) => {
  const Song = sequelize.define('song', {
    name     : DataTypes.STRING,
    price    : DataTypes.DECIMAL,
    url      : DataTypes.STRING,
    filetype : DataTypes.STRING,
  },
  { underscored: true }
);

  Song.associate = (models) => {
    Song.belongsTo(models.Profile, {
      foreignKey: 'author',
    });
  };

  return Song;
};
