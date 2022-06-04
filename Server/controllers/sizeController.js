const { Size } = require("../models");

class SizeController {
  static showAll(req, res, next) {
    Size.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static createSize(req, res, next) {
    let newSize = {
      name: req.body.name,
    };
    Size.create(newSize)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
  static deleteSize(req, res, next) {
    const id = +req.params.id;
    Size.destroy({ where: { id: id } })
      .then((data) => {
        if (data) {
          res
            .status(200)
            .json({ message: `Size with id ${id} success to deleted` });
        } else {
          next({
            name: "Not Found",
            message: `Size with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static updateSize(req, res, next) {
    let id = +req.params.id;
    let updateSize = {
      name: req.body.name,
    };
    Size.update(updateSize, {
      where: { id: id },
      returning: true,
    })
      .then((data) => {
        if (data[0]) {
          res.status(200).json(data[1][0]);
        } else {
          next({
            name: "Not Found",
            message: `Size with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static showById(req, res, next) {
    const id = +req.params.id;
    Size.findByPk(id)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          next({
            name: "Not Found",
            message: `Size with id ${id} not found`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}
module.exports = SizeController;
