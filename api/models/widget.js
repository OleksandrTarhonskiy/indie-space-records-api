export default (sequelize, DataTypes) => {
  const Widget = sequelize.define('widget', {
    type : DataTypes.STRING,
    link : DataTypes.STRING,
  },
  { underscored: true }
);

  Widget.associate = (models) => {
    Widget.belongsTo(models.Section, {
      foreignKey: {
        name: 'sectionId',
        field: 'section_id',
      },
    });
  };

  return Widget;
};
