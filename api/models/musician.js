export default (sequelize, DataTypes) => {
  const Musician = sequelize.define(
    'musician',
    {
      bandName : {
        type   : DataTypes.STRING,
        unique : true,
      },
      name     : DataTypes.STRING,
      email    : {
        type   : DataTypes.STRING,
        unique : true,
      },
      password : DataTypes.STRING,
    },
    { underscored: true }
  );

  Musician.associate = (models) => {
    Musician.hasMany(models.Album, {
      foreignKey: {
        name: 'musicianId',
        field: 'musician_id'
      },
    });
  };

  return Musician;
};
