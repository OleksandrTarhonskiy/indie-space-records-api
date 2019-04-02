import Sequelize from 'sequelize';

const sequelize = new Sequelize('indie_space_records', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true,
  },
});

const models = {
  User    : sequelize.import('./user'),
  Profile : sequelize.import('./profile'),
  Theme   : sequelize.import('./theme'),
  Event   : sequelize.import('./event'),
  Song    : sequelize.import('./song'),
  Product : sequelize.import('./product'),
  Section : sequelize.import('./section'),
  Widget  : sequelize.import('./widget'),
  Order   : sequelize.import('./order'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
