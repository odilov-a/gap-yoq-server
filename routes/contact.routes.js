const { Router } = require("express");
const contactController = require("../controller/contact.controller.js");
const contactRoutes = Router();

contactRoutes.get("/", contactController.getAllContactInfo);
contactRoutes.put("/:id", contactController.updateContactInfo);

module.exports = contactRoutes;