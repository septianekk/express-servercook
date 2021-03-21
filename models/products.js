const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  longDescription: {
    type: String,
    default: "",
  },
  bahan: {
    type: String,
    default: "",
  },
  step: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
