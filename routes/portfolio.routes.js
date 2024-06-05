const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");
const portfolioController = require("../controller/portfolio.controller");
const portfolioRoutes = Router();

portfolioRoutes.get("/", portfolioController.getAll);
portfolioRoutes.post("/", authMiddleware, uploadMiddleware, portfolioController.addPortfolio);
portfolioRoutes.post('/img', authMiddleware, uploadMiddleware, portfolioController.addImg);
portfolioRoutes.put("/:id", authMiddleware, uploadMiddleware, portfolioController.updatePortfolio);
portfolioRoutes.delete("/:id", authMiddleware, portfolioController.deletePortfolio);

module.exports = portfolioRoutes;