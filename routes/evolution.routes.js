const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const evolutionController = require("../controller/evolution.controller.js");
const evolutionRoutes = Router();

evolutionRoutes.get("/", evolutionController.getAllEvolutions);
evolutionRoutes.post("/", authMiddleware, evolutionController.addEvolution);
evolutionRoutes.put("/:id", authMiddleware, evolutionController.updateEvolution);
evolutionRoutes.delete("/:id", authMiddleware, evolutionController.deleteEvolution);

module.exports = evolutionRoutes;