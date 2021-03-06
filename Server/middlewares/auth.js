const { User } = require("../models");
const { jwtVerify } = require("../helpers/jwt");

function authentication(req, res, next) {
  const { access_token } = req.headers;
  if (access_token) {
    const payload = jwtVerify(access_token);
    User.findByPk(payload.id)
      .then((data) => {
        if (data) {
          req.user = { id: data.id, username: data.username };
          next();
        } else {
          next({
            name: "invalid JWT",
            message: "invalid JWT",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } else {
    next({
      name: "Not Login",
      message: "You Must Login First",
    });
  }
}

module.exports = { authentication };
