export default (sequelize, DataTypes) => {
  const Theme = sequelize.define('theme', {
    name  : DataTypes.STRING,
    style : DataTypes.TEXT,
    fonts : DataTypes.TEXT,
  },
  { underscored: true }
);

  Theme.associate = (models) => {
    Theme.belongsTo(models.Profile, {
      foreignKey: 'owner',
    });

    Theme.hasMany(models.Section, {
      foreignKey: {
        name: 'themeId',
        field: 'theme_id',
      },
    });
  };

  return Theme;
};
