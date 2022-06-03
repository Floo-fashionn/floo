"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Color.hasMany(models.ColorProduct, { foreignKey: "ColorId" });
    }
  }
  Color.init(
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
      modelName: "Color",
    }
  );
  return Color;
};
