const mongoose = require("mongoose");
const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required : true,
    },
    description: {
      type: String,
      required : true,
    },
    hashtag: {
      type: String,
      required : true,
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