const mongoose = require("mongoose");
const TYPES = ["animal", "oil", "cotton", "village", "spinning", "weaving", "paint", "sewing"];
const GallerySchema = new mongoose.Schema(
  {
    image: {
      type: Array,
      required : true,
    },
    type: {
      type: String,
      enum: TYPES,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("galleries", GallerySchema);
module.exports = Gallery;