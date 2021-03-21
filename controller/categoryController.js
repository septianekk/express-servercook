const Category = require("../models/category");

exports.addCategory = async (req, res) => {
  let category = new Category({
    nama: req.body.nama,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
};

// get all
exports.getCategory = (req, res) => {
  Category.find()
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

// exports.getCategorybyId = async (req, res) => {
//   const category = await Category.findById(req.params.id);
//   if (!category) {
//     res.status(500).send({ message: "Error " + id });
//   }
//   res.status(200).send(category);
// };

exports.getCategoryById = (req, res) => {
  let id = req.params.id;
  Category.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error " + id });
    });
};

// get by name
exports.getCategoryByName = (req, res) => {
  let nama = req.params.nama;

  Category.find({ nama: { $regex: nama, $options: "i" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error ambil data",
      });
    });
};

// delete
exports.deleteCategory = (req, res) => {
  let id = req.params.id;
  Category.findOneAndDelete({ _id: id }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json({
        message: `Users dengan id = ${id} Berhasil dihapus`,
        data: data,
      });
    }
  });
};
