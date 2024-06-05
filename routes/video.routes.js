const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const multiMiddleware = require("../middlewares/multi.middleware.js");
const videoController = require("../controller/video.controller.js");
const videoRoutes = Router();

videoRoutes.get("/", videoController.getAllVideos);
videoRoutes.post("/", authMiddleware, multiMiddleware, videoController.addVideo);
videoRoutes.put("/:id", authMiddleware, multiMiddleware, videoController.addVideo);
videoRoutes.delete("/:id", authMiddleware, videoController.addVideo);

module.exports = videoRoutes;