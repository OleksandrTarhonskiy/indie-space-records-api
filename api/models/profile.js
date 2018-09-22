export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('profile', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    genres: DataTypes.STRING,
  },
  { underscored: true }
);

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'owner',
    });

    Profile.hasOne(models.Template, {
      foreignKey: {
        name: 'profileId',
        field: 'profile_id',
      },
    });
  };

  return Profile;
};
