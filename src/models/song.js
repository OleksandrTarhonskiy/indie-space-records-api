export default (sequelize, DataTypes) => {
  const Song = sequelize.define('song', {
    name        : DataTypes.STRING,
    price       : DataTypes.DECIMAL,
    pricingType : DataTypes.STRING,
    release     : DataTypes.DATE,
    url         : DataTypes.STRING,
    filetype    : DataTypes.STRING,
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
