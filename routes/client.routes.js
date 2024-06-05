const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");
const clientController = require("../controller/client.controller");
const clientRoutes = Router();

clientRoutes.get("/", clientController.getAll);
clientRoutes.post("/", authMiddleware, uploadMiddleware, clientController.addClient);
clientRoutes.put("/:id", authMiddleware, uploadMiddleware, clientController.updateClient);
clientRoutes.delete("/:id", authMiddleware, clientController.deleteClient);

module.exports = clientRoutes;