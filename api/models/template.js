export default (sequelize, DataTypes) => {
  const Template = sequelize.define('template', {
    background: {
      type: DataTypes.STRING,
      defaultValue: '#808080',
    },
    typographyColor: {
      type: DataTypes.STRING,
      defaultValue: '#ffff',
    },
    links: {
      type: DataTypes.STRING,
      defaultValue: '#ffff',
    },
    linksHover: {
      type: DataTypes.STRING,
      defaultValue: 'blue',
    },
  },
  { underscored: true }
);

  Template.associate = (models) => {
    Template.belongsTo(models.Profile, {
      foreignKey: 'owner',
    });
  };

  return Template;
};
