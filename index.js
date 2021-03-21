const express = require("express");
const mongoose = require("mongoose");
const port = 3000;

const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config({ path: "db.env" });
// const DB = process.env.DATABASE;
mongoose
  .connect(
    "mongodb+srv://admin-user:admin90@cluster0.rzqnb.mongodb.net/app-cook?authSource=admin&replicaSet=atlas-kw0a30-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((connection) => {
    console.log("Connected To Database");
  });

const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");

const app = express();

app.use(express.json()); // for parsing application/json

app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use("/categories", categoryRouter);
app.use("/products", productRouter);

app.listen(port, (req, res) => {
  console.log("konnek nih boss");
});

module.exports = app;
