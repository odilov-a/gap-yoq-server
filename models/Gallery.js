const mongoose = require("mongoose");
const GallerySchema = new mongoose.Schema(
  {
    image: {
      type: Array,
      required : true,
    },
  },
  { timestamps: true }
);

const Galleries = mongoose.model("gallery", GallerySchema);
module.exports = Galleries;