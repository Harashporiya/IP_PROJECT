const express = require("express")
const router = express.Router();

const productCreate = require("../Controllers/productAddForm");
const { isAuthenticated } = require("../middleware/auth");
const upload = require("../Config/multer")

router.post("/product-create", isAuthenticated, productCreate.productAddForm,productCreate.createProduct);
router.get("/all-product", isAuthenticated, productCreate.getAllProduct);
router.get("/public-products", productCreate.getPublicProducts);
router.get("/:id/product",productCreate.getProductById);
router.delete("/:id/product-delete", isAuthenticated, productCreate.productDeleteById);
router.put("/:id/product-update",isAuthenticated, upload.single('image'), productCreate.updateProduct);

module.exports = router;