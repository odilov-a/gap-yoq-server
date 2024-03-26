const { Router } = require("express");
const translationRoutes = require("./translation.routes.js");
const userRoutes = require("./user.routes.js");
const partnerRoutes = require("./partner.routes.js");
const newsRoutes = require("./news.routes.js");
const evolutionRoutes = require("./evolution.routes.js");
const galleryRoutes = require("./gallery.routes.js");
const videoRoutes = require("./video.routes.js");
const feedbackRoutes = require("./feedback.routes.js");
const dealerRoutes = require("./dealer.routes.js");
const router = Router();

router.use("/translations", translationRoutes);
router.use(userRoutes);
router.use("/partners", partnerRoutes);
router.use("/news", newsRoutes);
router.use("/evolutions", evolutionRoutes);
router.use("/galleries", galleryRoutes);
router.use("/videos", videoRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/dealers", dealerRoutes);

module.exports = router;