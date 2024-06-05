const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const imageMiddleware = require("../middlewares/image.middleware.js");
const newsController = require("../controller/news.controller.js");
const newsRoutes = Router();

newsRoutes.get("/", newsController.getAllNews);
newsRoutes.post("/", authMiddleware, imageMiddleware, newsController.addNews);
newsRoutes.put("/:id", authMiddleware, imageMiddleware, newsController.updateNews);
newsRoutes.delete("/:id", authMiddleware, newsController.deleteNews);

module.exports = newsRoutes;