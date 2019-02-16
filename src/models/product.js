export default (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    type         : DataTypes.STRING,
    title        : DataTypes.STRING,
    desc         : DataTypes.TEXT,
    price        : DataTypes.DECIMAL,
    deliveryType : DataTypes.STRING,
    url          : DataTypes.STRING,
    filetype     : DataTypes.STRING,
    quantity     : DataTypes.INTEGER,
  },
  { underscored: true }
);

  Product.associate = (models) => {
    Product.belongsTo(models.Profile, {
      foreignKey: 'owner',
    });
  };

  return Product;
};
