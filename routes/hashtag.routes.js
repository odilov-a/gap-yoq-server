const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const hashtagController = require("../controller/hashtag.controller.js");
const hashtagRoutes = Router();

hashtagRoutes.get("/", hashtagController.getAllHashtags);
hashtagRoutes.post("/", authMiddleware, hashtagController.addHashtag);
hashtagRoutes.put("/:id", authMiddleware, hashtagController.updateHashtag);
hashtagRoutes.delete("/:id", authMiddleware, hashtagController.deleteHashtag);

module.exports = hashtagRoutes;