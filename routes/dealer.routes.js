const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const dealerController = require("../controller/dealer.controller.js");
const dealerRoutes = Router();

dealerRoutes.get("/", dealerController.getAllDealers);
dealerRoutes.post("/", authMiddleware, dealerController.addDealer);
dealerRoutes.put("/:id", authMiddleware, dealerController.updateDealer);
dealerRoutes.delete("/:id", authMiddleware, dealerController.deleteDealer);

module.exports = dealerRoutes;