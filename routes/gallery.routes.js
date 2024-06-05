const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/upload.middleware.js");
const galleryController = require("../controller/gallery.controller.js");
const galleryRoutes = Router();

galleryRoutes.get("/", galleryController.getAllGalleries);
galleryRoutes.post("/", authMiddleware, uploadMiddleware, galleryController.addGallery);
galleryRoutes.put("/:id", authMiddleware, uploadMiddleware, galleryController.updateGallery);
galleryRoutes.delete("/:id", authMiddleware, galleryController.deleteGallery);

module.exports = galleryRoutes;