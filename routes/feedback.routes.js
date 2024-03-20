const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const feedbackController = require("../controller/feedback.controller.js");
const feedbackRoutes = Router();

feedbackRoutes.get("/", feedbackController.getAllFeedbacks);
feedbackRoutes.get("/:id", feedbackController.getFeedbackById);
feedbackRoutes.post("/", feedbackController.createFeedback);
feedbackRoutes.put("/:id", authMiddleware, feedbackController.updateFeedback);
feedbackRoutes.delete("/:id", authMiddleware, feedbackController.deleteFeedback);

module.exports = feedbackRoutes;