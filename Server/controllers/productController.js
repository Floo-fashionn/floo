const { Product, User, Category } = require("../models");

class ProductController {
  static showAll(req, res, next) {
    Product.findAll({
      include: [Category],
      order: [["id", "DESC"]],
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static createProduct(req, res, next) {
    let newProduct = {
      name: req.body.name,
      categoryId: req.body.categoryId,
    };
    Product.create(newProduct)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static deleteProduct(req, res, next) {
    const id = +req.params.id;
    Category.destroy({ where: { id: id } })
      .then((data) => {
        if (data) {
          res
            .status(200)
            .json({ message: `Category with id ${id} success to deleted` });
        } else {
          next({
            name: "Not Found",
            message: `Category with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateProduct(req, res, next) {
    let id = +req.params.id;
    let updateProduct = {
      name: req.body.name,
      categoryId: req.body.categoryId,
    };
    Product.update(updateProduct, {
      where: { id: id },
      returning: true,
    })
      .then((data) => {
        if (data[0]) {
          res.status(200).json(data);
        } else {
          next({
            name: "Not Found",
            message: `Product with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static showById(req, res, next) {
    const id = +req.params.id;
    Product.findByPk(id, { include: [{ model: Category }, { model: User }] })
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          next({
            name: "Not Found",
            message: `Product with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}
module.exports = ProductController;
