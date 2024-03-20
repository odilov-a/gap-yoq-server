const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required : true,
    },
    description: {
      type: String,
      required : true,
    },
    image: {
      type: Array,
      required : true,
    },
  },
  { timestamps: true }
);
const Products = mongoose.model("product", ProductSchema);
module.exports = Products;