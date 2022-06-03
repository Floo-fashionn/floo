"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.belongsToMany(models.Size, {
        as: "sizeProduct",
        through: models.SizeProduct,
      });
      Product.belongsToMany(models.Color, {
        as: "colorProduct",
        through: models.ColorProduct,
      });
      Product.hasMany(models.Order, { foreignKey: "ProductId" });
      Product.hasMany(models.OrderProduct, { foreignKey: "ProductId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "name cannot be null",
          },
          notEmpty: {
            args: true,
            msg: "name cannot be empty",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
