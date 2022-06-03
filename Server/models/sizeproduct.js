"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SizeProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SizeProduct.belongsTo(models.Product);
      SizeProduct.belongsTo(models.Size);
    }
  }
  SizeProduct.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ProductId: DataTypes.INTEGER,
      SizeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SizeProduct",
    }
  );
  return SizeProduct;
};
