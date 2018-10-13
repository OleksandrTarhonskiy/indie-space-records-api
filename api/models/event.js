export default (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    title: {
      type : DataTypes.STRING,
      unique: true,
    },
    details : DataTypes.TEXT,
    price   : DataTypes.DECIMAL,
    date    : DataTypes.DATE,
    country : DataTypes.STRING,
    region  : DataTypes.STRING,
  },
  { underscored: true }
);

  Event.associate = (models) => {
    Event.belongsTo(models.Profile, {
      foreignKey: {
        name: 'profileId',
        field: 'profile_id',
      },
    });
  };

  return Event;
};
