const { Router } = require("express");
const translationRoutes = require("./translation.routes.js");
const userRoutes = require("./user.routes.js");
const vacancyRoutes = require("./vacancy.routes.js");
const clientRoutes = require("./client.routes.js");
const positionRoutes = require("./position.routes.js");
const teamRoutes = require("./team.routes.js");
const portfolioRoutes = require("./portfolio.routes.js");
const router = Router();

router.use("/translations", translationRoutes);
router.use("/users", userRoutes);
router.use("/vacancies", vacancyRoutes);
router.use("/clients", clientRoutes);
router.use("/position", positionRoutes);
router.use("/team", teamRoutes);
router.use("/portfolio", portfolioRoutes);

module.exports = router;