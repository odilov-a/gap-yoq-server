const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const partnerController = require("../controller/partner.controller.js");
const partnerRoutes = Router();

partnerRoutes.get("/", partnerController.getAllPartners);
partnerRoutes.post("/", authMiddleware, uploadMiddleware, partnerController.addPartner);
partnerRoutes.put("/:id", authMiddleware, uploadMiddleware, partnerController.updatePartner);
partnerRoutes.delete("/:id", authMiddleware, partnerController.deletePartner);

module.exports = partnerRoutes;