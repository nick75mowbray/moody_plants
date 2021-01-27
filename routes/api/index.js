const router = require("express").Router();
const ProductRoutes = require("./items");

// products routes
router.use("/products", ProductRoutes);

module.exports = router;
