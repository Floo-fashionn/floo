const routers = require("express").Router();
const userRouters = require("./user");
const categoryRouters = require("./category");
const productRouters = require("./product");
const { authentication } = require("../middlewares/auth");

routers.use("/", userRouters);
routers.use(authentication);
routers.use("/categories", categoryRouters);
routers.use("/products", productRouters);

module.exports = routers;
