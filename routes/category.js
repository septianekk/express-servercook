var express = require("express");
var router = express.Router();
var CategoryController = require("../controller/categoryController");

router.route("/").post(CategoryController.addCategory);
router.route("/").get(CategoryController.getCategory);
router.route("/:id").get(CategoryController.getCategoryById);
router.route("/:nama").get(CategoryController.getCategoryByName);
router.route("/:id").delete(CategoryController.deleteCategory);

module.exports = router;
