import bcrypt      from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
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
      },
      hasProfile : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      underscored : true,
      hooks       : {
        afterValidate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.password = hashedPassword;
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Album, {
      foreignKey : {
        name  : 'userId',
        field : 'user_id'
      },
    });

    User.hasOne(models.Profile, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return User;
};
