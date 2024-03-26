const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const imageMiddleware = require("../middlewares/image.middleware.js");
const galleryController = require("../controller/gallery.controller.js");
const galleryRoutes = Router();

galleryRoutes.get("/", galleryController.getAllGallery);
galleryRoutes.get("/:id", galleryController.getGalleryById);
galleryRoutes.post("/", authMiddleware, imageMiddleware, galleryController.createGallery);
galleryRoutes.put("/:id", authMiddleware, imageMiddleware, galleryController.updateGallery);
galleryRoutes.delete("/:id", authMiddleware, galleryController.deleteGallery);

module.exports = galleryRoutes;