export default (sequelize, DataTypes) => {
  const Theme = sequelize.define('theme', {
    name  : DataTypes.STRING,
    style : DataTypes.STRING,
    fonts : DataTypes.STRING,
  },
  { underscored: true }
);

  Theme.associate = (models) => {
    Theme.belongsTo(models.Profile, {
      foreignKey: 'owner',
    });
  };

  return Theme;
};
