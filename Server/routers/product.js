const routers = require("express").Router();
const ProductController = require("../controllers/productController");

routers.get("/", ProductController.showAll);
routers.get("/:id", ProductController.showById);
routers.post("/", ProductController.createProduct);
routers.put("/:id", ProductController.updateProduct);
routers.delete("/:id", ProductController.deleteProduct);

module.exports = routers;
