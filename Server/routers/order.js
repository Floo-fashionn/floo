const routers = require("express").Router();
const OrderController = require("../controllers/orderController");

routers.get("/", OrderController.showAll);
routers.get("/:id", OrderController.showById);
routers.post("/", OrderController.createOrder);
routers.put("/:id", OrderController.updateOrder);
routers.delete("/:id", OrderController.deleteOrder);

module.exports = routers;
