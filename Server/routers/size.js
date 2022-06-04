const routers = require("express").Router();
const SizeController = require("../controllers/sizeController");

routers.get("/", SizeController.showAll);
routers.get("/:id", SizeController.showById);
routers.post("/", SizeController.createSize);
routers.delete("/:id", SizeController.deleteSize);
routers.put("/:id", SizeController.updateSize);

module.exports = routers;
