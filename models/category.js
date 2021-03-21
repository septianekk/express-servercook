const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const categorySchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
    default: "",
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
  itemId: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
});

// categorySchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// categorySchema.set("toJSON", {
//   virtuals: true,
// });

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
