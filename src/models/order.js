export default (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    quantity        : DataTypes.INTEGER,
    firstName       : DataTypes.STRING,
    lastName        : DataTypes.STRING,
    phoneNumber     : DataTypes.STRING,
    email           : DataTypes.STRING,
    city            : DataTypes.STRING,
    deliveryType    : DataTypes.STRING,
    deliveryAddress : DataTypes.STRING,
    country         : DataTypes.STRING,
    zipCode         : DataTypes.STRING,
  },
  { underscored: true }
);

  Order.associate = (models) => {
    Order.belongsTo(models.Profile, {
      foreignKey: 'owner',
    });

    Order.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        field: 'product_id',
      },
    });
  };

  return Order;
};
