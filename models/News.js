const mongoose = require("mongoose");
const NewsSchema = new mongoose.Schema(
  {
    titleUz: {
      type: String,
      required : true,
    },
    titleRu: {
      type: String,
      required : true,
    },
    titleEn: {
      type: String,
      required : true,
    },
    descriptionUz: {
      type: String,
      required : true,
    },
    descriptionEn: {
      type: String,
      required : true,
    },
    descriptionRu: {
      type: String,
      required : true,
    },
    hashtag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hashtag",
    },
    image: {
      type: Array,
      required : true,
    },
    image02: {
      type: Array,
    },
    image03: {
      type: Array,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("news", NewsSchema);
module.exports = News;