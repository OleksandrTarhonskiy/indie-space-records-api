export default (sequelize, DataTypes) => {
  const Album = sequelize.define('album', {
    name : DataTypes.STRING,
    year : DataTypes.STRING,
  });

  Album.associate = (models) => {
    Album.belongsTo(models.Musician, {
      foreignKey: 'musicianId',
    });
  };

  return Album;
};
