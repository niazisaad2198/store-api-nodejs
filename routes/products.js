const { Router } = require("express");

const {
  getAllProductsStatic,
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const router = Router();

router.route("/").get(getAllProducts)
router.route("/static").get(getAllProductsStatic)
//router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
