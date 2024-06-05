const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const positionController = require("../controller/position.controller");
const positionRoutes = Router();

positionRoutes.get("/", positionController.getAll);
positionRoutes.post("/", authMiddleware, positionController.addPosition);
positionRoutes.put("/:id", authMiddleware, positionController.updatePosition);
positionRoutes.delete("/:id", authMiddleware, positionController.deletePosition);

module.exports = positionRoutes;