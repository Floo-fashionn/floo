const { Color } = require("../models");

class ColorController {
  static showAll(req, res, next) {
    Color.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static createColor(req, res, next) {
    let newColor = {
      name: req.body.name,
    };
    Color.create(newColor)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static deleteColor(req, res, next) {
    const id = +req.params.id;
    Color.destroy({ where: { id: id } })
      .then((data) => {
        if (data) {
          res
            .status(200)
            .json({ message: `Color with id ${id} success to deleted` });
        } else {
          next({
            name: "Not Found",
            message: `Color with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateColor(req, res, next) {
    let id = +req.params.id;
    let updateColor = {
      name: req.body.name,
    };
    Color.update(updateColor, {
      where: { id: id },
      returning: true,
    })
      .then((data) => {
        if (data[0]) {
          res.status(200).json(data[1][0]);
        } else {
          next({
            name: "Not Found",
            message: `Color with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static showById(req, res, next) {
    const id = +req.params.id;
    Color.findByPk(id)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          next({
            name: "Not Found",
            message: `Color with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}
module.exports = ColorController;
