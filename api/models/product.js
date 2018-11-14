export default (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    type         : DataTypes.STRING,
    title        : DataTypes.STRING,
    desc         : DataTypes.STRING,
    price        : DataTypes.DECIMAL,
    deliveryType : DataTypes.STRING,
    inStock      : {
      type         : DataTypes.BOOLEAN,
      defaultValue : true,
    },
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
