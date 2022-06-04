const routers = require("express").Router();
const ColorController = require("../controllers/colorController");

routers.get("/", ColorController.showAll);
routers.get("/:id", ColorController.showById);
routers.post("/", ColorController.createColor);
routers.delete("/:id", ColorController.deleteColor);
routers.put("/:id", ColorController.updateColor);

module.exports = routers;
