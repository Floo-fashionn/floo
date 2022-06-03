const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { jwtSign } = require("../helpers/jwt");

class UserController {
  static register(req, res, next) {
    let newUser = {
      username: req.body.username,
      password: req.body.password,
    };
    User.create(newUser)
      .then((data) => {
        res.status(201).json({ id: data.id, username: data.username });
      })
      .catch((err) => {
        next(err);
      });
  }
  static login(req, res, next) {
    User.findOne({ where: { username: req.body.username } })
      .then((data) => {
        if (data) {
          if (comparePassword(req.body.password, data.password)) {
            let payload = {
              id: data.id,
              username: data.username,
            };
            let access_token = jwtSign(payload);
            res.status(200).json({ access_token });
          } else {
            next({
              name: "Invalid Login",
              message: `email/password not match`,
            });
          }
        } else {
          next({
            name: "Invalid Login",
            message: `email/password not match`,
          });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}
module.exports = UserController;
