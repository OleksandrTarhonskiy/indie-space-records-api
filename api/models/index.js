import Sequelize from 'sequelize';

const sequelize = new Sequelize('indie_space_records', 'postgres', 'postgres', {
  dialect: 'postgres',
  underscored: true,
});

const models = {
  Musician : sequelize.import('./musician'),
  Album    : sequelize.import('./album'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
