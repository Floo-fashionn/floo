const { Product, Category, Order, OrderProduct } = require("../models");

class OrderController {
  static showAll(req, res, next) {
    Order.findAll({
      include: [Product, Category],
      order: [["id", "DESC"]],
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static createOrder(req, res, next) {
    let newOrder = {
      nameCustomer: req.body.nameCustomer,
      status: "pending",
      date: req.body.date,
      OrderProductId: req.body.OrderProductId,
    };
    Order.create(newOrder)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static deleteOrder(req, res, next) {
    const id = +req.params.id;
    Order.destroy({ where: { id: id } })
      .then((data) => {
        if (data) {
          res
            .status(200)
            .json({ message: `Order with id ${id} success to deleted` });
        } else {
          next({
            name: "Not Found",
            message: `Order with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateOrder(req, res, next) {
    let id = +req.params.id;
    let updateOrder = {
      nameCustomer: req.body.nameCustomer,
      status: req.body.status,
      date: req.body.date,
      OrderProductId: req.body.OrderProductId,
    };
    Order.update(updateOrder, {
      where: { id: id },
      returning: true,
    })
      .then((data) => {
        if (data[0]) {
          res.status(200).json(data);
        } else {
          next({
            name: "Not Found",
            message: `Order with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static showById(req, res, next) {
    const id = +req.params.id;
    Order.findByPk(id, { include: [{ model: Category }, { model: User }] })
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          next({
            name: "Not Found",
            message: `Order with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateStatusOrder(req, res, next) {
    let id = +req.params.id;
    let updateStatus = {
      status: req.body.status,
    };
    let oldStatus = "";
    Order.findByPk(id)
      .then((data) => {
        oldStatus = data.status;
        return Order.update(updateStatus, {
          where: { id: id },
          returning: true,
        });
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
}
module.exports = OrderController;
