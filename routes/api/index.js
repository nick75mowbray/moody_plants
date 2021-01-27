const router = require("express").Router();
const ProductRoutes = require("./products");

// products routes
router.use("/products", ProductRoutes);

module.exports = router;
