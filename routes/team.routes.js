const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");
const teamController = require("../controller/team.controller");
const teamRoutes = Router();

teamRoutes.get("/", teamController.getAll);
teamRoutes.post("/", authMiddleware, uploadMiddleware, teamController.addTeam);
teamRoutes.put("/:id", authMiddleware, uploadMiddleware, teamController.updateTeam);
teamRoutes.delete("/:id", authMiddleware, teamController.deleteTeam);

module.exports = teamRoutes;