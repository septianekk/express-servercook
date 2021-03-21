var router = require("express").Router();
var ProductController = require("../controller/productController");
// get all data

router.get("/", ProductController.getProduct);
router.post("/", ProductController.addProduct);
router.put("/:id", ProductController.addProduct);
router.delete("/:id", ProductController.deteleProduct);
module.exports = router;
