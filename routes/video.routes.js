const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const videoMiddleware = require("../middlewares/video.middleware.js");
const videoController = require("../controller/video.controller.js");
const videoRoutes = Router();

videoRoutes.get("/", videoController.getAllVideo);
videoRoutes.get("/:id", videoController.getVideoById);
videoRoutes.post("/", authMiddleware, videoMiddleware, videoController.createVideo);
videoRoutes.put("/:id", authMiddleware, videoMiddleware, videoController.updateVideo);
videoRoutes.delete("/:id", authMiddleware, videoController.deleteVideo);

module.exports = videoRoutes;