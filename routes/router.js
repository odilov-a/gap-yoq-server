const { Router } = require("express");
const translationRoutes = require("./translation.routes.js");
const userRoutes = require("./user.routes.js");
const galleryRoutes = require("./gallery.routes.js");
const dealerRoutes = require("./dealer.routes.js");
const evolutionRoutes = require("./evolution.routes.js");
const hashtagRoutes = require("./hashtag.routes.js");
const newsRoutes = require("./news.routes.js");
const partnerRoutes = require("./partner.routes.js");
const videoRoutes = require("./video.routes.js");
const router = Router();

router.use("/translations", translationRoutes);
router.use("/users", userRoutes);
router.use("/galleries", galleryRoutes);
router.use("/dealers", dealerRoutes);
router.use("/evolutions", evolutionRoutes);
router.use("/hashtags", hashtagRoutes);
router.use("/news", newsRoutes);
router.use("/partners", partnerRoutes);
router.use("/videos", videoRoutes);

module.exports = router;