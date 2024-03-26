const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const dealerContoller = require("../controller/dealer.contoller.js");
const dealerRoutes = Router();

dealerRoutes.get("/", dealerContoller.getAllDealer);
dealerRoutes.get("/:id", dealerContoller.getDealerById);
dealerRoutes.post("/", authMiddleware, dealerContoller.createDealer);
dealerRoutes.put("/:id", authMiddleware, dealerContoller.updateDealer);
dealerRoutes.delete("/:id", authMiddleware, dealerContoller.deleteDealer);

module.exports = dealerRoutes;