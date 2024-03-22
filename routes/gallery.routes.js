const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/image.middleware.js");
const galleryController = require("../controller/gallery.controller.js");
const galleryRoutes = Router();

galleryRoutes.get("/", galleryController.getAllGalleryImages);
galleryRoutes.get("/:id", galleryController.getGalleryById);
galleryRoutes.post("/", authMiddleware, uploadMiddleware, galleryController.createGallery);
galleryRoutes.put("/:id", authMiddleware, uploadMiddleware, galleryController.updateGallery);
galleryRoutes.delete("/:id", authMiddleware, galleryController.deleteGallery);

module.exports = galleryRoutes;