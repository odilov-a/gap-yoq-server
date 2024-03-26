const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const imageMiddleware = require("../middlewares/multi.middleware.js");
const videoController = require("../controller/video.controller.js");
const videoRoutes = Router();

videoRoutes.get("/", videoController.getAllVideo);
videoRoutes.get("/:id", videoController.getVideoById);
videoRoutes.post(
  "/",
  authMiddleware,
  imageMiddleware,
  videoController.createVideo
);
videoRoutes.put(
  "/:id",
  authMiddleware,
  imageMiddleware,
  videoController.updateVideo
);
videoRoutes.delete("/:id", authMiddleware, videoController.deleteVideo);

module.exports = videoRoutes;
