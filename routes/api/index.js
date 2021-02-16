const router = require("express").Router();
const ProductRoutes = require("./products");
const UserRoutes = require("./users");

// products routes
router.use("/products", ProductRoutes);
router.use("/users", UserRoutes);

module.exports = router;
