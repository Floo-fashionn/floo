const routers = require("express").Router();
const userRouters = require("./user");
const categoryRouters = require("./category");
const productRouters = require("./product");
const sizeRouters = require("./size");
const colorRouters = require("./color");
const orderRouters = require("./order");
const { authentication } = require("../middlewares/auth");

routers.use("/", userRouters);
routers.use(authentication);
routers.use("/categories", categoryRouters);
routers.use("/products", productRouters);
routers.use("/order", orderRouters);
routers.use("/size", sizeRouters);
routers.use("/color", colorRouters);

module.exports = routers;
