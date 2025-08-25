const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "products",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(191), allowNull: false },
      description: { type: DataTypes.TEXT },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    },
    {}
  );

  return Product;
};
