"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Size.hasMany(models.SizeProduct, { foreignKey: "SizeId" });
    }
  }
  Size.init(
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
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};
