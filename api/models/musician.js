import bcrypt      from 'bcrypt';

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
        type     : DataTypes.STRING,
        unique   : true,
        validate : {
          isEmail : {
            args  : true,
            msg   : 'Invalid email',
          },
        },
      },
      password : {
        type     : DataTypes.STRING,
        validate : {
          len : {
            args : [8, 100],
            msg  : 'The password needs to be between 8 and 100 characters long',
          },
        },
      }
    },
    {
      underscored : true,
      hooks       : {
        afterValidate: async (musician) => {
          const hashedPassword = await bcrypt.hash(musician.password, 12);
          musician.password = hashedPassword;
        },
      },
    }
  );

  Musician.associate = (models) => {
    Musician.hasMany(models.Album, {
      foreignKey : {
        name  : 'musicianId',
        field : 'musician_id'
      },
    });
  };

  return Musician;
};
