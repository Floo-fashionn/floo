"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ColorProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ColorProduct.belongsTo(models.Product);
      ColorProduct.belongsTo(models.Color);
    }
  }
  ColorProduct.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ProductId: DataTypes.INTEGER,
      ColorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ColorProduct",
    }
  );
  return ColorProduct;
};
