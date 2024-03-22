const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/image.middleware.js");
const partnerController = require("../controller/partner.controller.js");
const partnerRoutes = Router();

partnerRoutes.get("/", partnerController.getAllPartners);
partnerRoutes.get("/:id", partnerController.getPartnerById);
partnerRoutes.post("/", authMiddleware, uploadMiddleware, partnerController.createPartner);
partnerRoutes.put("/:id", authMiddleware, uploadMiddleware, partnerController.updatePartner);
partnerRoutes.delete("/:id", authMiddleware, partnerController.deletePartner);

module.exports = partnerRoutes;