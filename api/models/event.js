export default (sequelize, DataTypes) => {
  const Event = sequelize.define('event', {
    title: {
      type : DataTypes.STRING,
      unique: true,
    },
    details : DataTypes.TEXT,
    date    : DataTypes.DATE,
    time    : DataTypes.TIME,
    price   : DataTypes.DECIMAL,
    country : DataTypes.STRING,
    region  : DataTypes.STRING,
  },
  { underscored: true }
);

  Event.associate = (models) => {
    Event.belongsTo(models.Profile, {
      foreignKey: {
        foreignKey: 'band',
      },
    });
  };

  return Event;
};
