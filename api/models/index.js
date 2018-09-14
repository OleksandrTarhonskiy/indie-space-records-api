import Sequelize from 'sequelize';

const sequelize = new Sequelize('indie_space_records', 'postgres', 'postgres', {
  dialect: 'postgres',
  underscored: true,
});

const models = {
  User    : sequelize.import('./user'),
  Album   : sequelize.import('./album'),
  Profile : sequelize.import('./profile'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
