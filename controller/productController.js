const Product = require("../models/products");
const Category = require("../models/category");

exports.getProduct = (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).json({
        message: "Data berhasil didapatkan",
        timestamp: req.requestTime,
        jumlahData: data.length,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error ambil data",
      });
    });
};

exports.addProduct = async (req, res) => {
  //   const category = await Category.findOne(req.body.category);
  //   if (!category) return res.status(400).send("Invalid Category");
  const {
    nama,
    price,
    description,
    longDescription,
    bahan,
    step,
    image,
    categoryId,
  } = req.body;

  const category = await Category.findOne({ _id: categoryId });
  const newProduct = {
    nama,
    price,
    description,
    longDescription,
    bahan,
    step,
    image,
    categoryId,
  };
  //   let product = new Product({
  //     nama: req.body.nama,
  //     price: req.body.price,
  //     description: req.body.description,
  //     longDescription: req.body.longDescription,
  //     bahan: req.body.bahan,
  //     step: req.body.step,
  //     image: req.body.image,
  //     category: req.body.category,
  //   });
  const product = await Product.create(newProduct);
  category.itemId.push({ _id: product._id });
  await category.save();
  const productName = await product.save();
  if (!productName)
    return res.status(400).send("The product cannot be created");
  res.send(productName);
};

exports.editProduct = async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const {
    nama,
    price,
    description,
    longDescription,
    bahan,
    step,
    image,
    categoryId,
  } = req.body;

  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      nama,
      price,
      description,
      longDescription,
      bahan,
      step,
      image,
      categoryId,
    },
    {
      new: true,
    }
  );
  if (!product) return res.status(400).send("Product cannot be updated");
  res.send(product);
};

exports.deteleProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "The product deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};
