export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    name: {
      type : DataTypes.STRING,
      unique: true,
    },
    genres   : DataTypes.STRING,
    country  : DataTypes.STRING,
    region   : DataTypes.STRING,
    currency : DataTypes.STRING,
  },
  { underscored: true }
);

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'owner',
    });

    Profile.hasOne(models.Theme, {
      foreignKey: {
        name: 'profileId',
        field: 'profile_id',
      },
    });

    Profile.hasMany(models.Event, {
      foreignKey: {
        name: 'profileId',
        field: 'profile_id',
      },
    });
  };

  return Profile;
};
