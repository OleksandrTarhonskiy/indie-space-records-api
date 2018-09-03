export default (sequelize, DataTypes) => {
  const Musician = sequelize.define('musician', {
    bandName : {
      type   : DataTypes.STRING,
      unique : true,
    },
    username : DataTypes.STRING,
    email    : {
      type   : DataTypes.STRING,
      unique : true,
    },
    password : DataTypes.STRING,
  });

  Musician.associate = (models) => {
    Musician.hasMany(models.Album, {
      foreignKey: 'musicianId',
    });
  };

  return Musician;
};
