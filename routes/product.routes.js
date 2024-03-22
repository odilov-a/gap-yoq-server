const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/image.middleware.js");
const productController = require("../controller/product.controller.js");
const productRoutes = Router();

productRoutes.get("/", productController.getAllProducts);
productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", authMiddleware, uploadMiddleware, productController.createProduct);
productRoutes.put("/:id", authMiddleware, uploadMiddleware, productController.updateProduct);
productRoutes.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = productRoutes;