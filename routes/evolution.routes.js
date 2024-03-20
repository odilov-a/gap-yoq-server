const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const evolutionContoller = require("../controller/evolution.contoller.js");
const evolutionRoutes = Router();

evolutionRoutes.get("/", evolutionContoller.getAllEvolution);
evolutionRoutes.get("/:id", evolutionContoller.getEvolutionById);
evolutionRoutes.post("/", authMiddleware, evolutionContoller.createEvolution);
evolutionRoutes.put("/:id", authMiddleware, evolutionContoller.updateEvolution);
evolutionRoutes.delete("/:id", authMiddleware, evolutionContoller.deleteEvolution);

module.exports = evolutionRoutes;