const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const vacancyController = require("../controller/vacancy.controller");
const vacancyRoutes = Router();

vacancyRoutes.get("/", vacancyController.getAll);
vacancyRoutes.post("/", authMiddleware, vacancyController.addVacancy);
vacancyRoutes.put("/:id", authMiddleware, vacancyController.updateVacancy);
vacancyRoutes.delete("/:id", authMiddleware, vacancyController.deleteVacancy);

module.exports = vacancyRoutes;