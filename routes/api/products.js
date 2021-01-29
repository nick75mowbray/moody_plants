const router = require("express").Router();
const productsController = require("../../controllers/productsController");

// Matches with "/api/products"
router.route("/")
  .get(productsController.findAll)

// Matches with "/api/products/:id"
router.route("/:id")
  .get(productsController.findById)
  .put(productsController.update)

module.exports = router;

