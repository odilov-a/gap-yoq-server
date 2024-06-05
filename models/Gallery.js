const mongoose = require("mongoose");
const TYPE_UZ = ["animal", "oil", "cotton", "village", "spinning", "weaving", "paint", "sewing"];
const TYPE_RU = ["animal", "oil", "cotton", "village", "spinning", "weaving", "paint", "sewing"];
const TYPE_EN = ["animal", "oil", "cotton", "village", "spinning", "weaving", "paint", "sewing"];
const GallerySchema = new mongoose.Schema(
  {
    image: {
      type: Array,
      required : true,
    },
    typeUz: {
      type: String,
      enum: TYPE_UZ,
    },
    typeRu: {
      type: String,
      enum: TYPE_RU,
    },
    typeEn: {
      type: String,
      enum: TYPE_EN,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("galleries", GallerySchema);
module.exports = Gallery;