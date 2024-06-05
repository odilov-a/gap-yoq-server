const mongoose = require("mongoose");
const hashtagSchema = new mongoose.Schema(
  {
    titleUz: {
      type: String,
      required: true,
    },
    titleRu: {
      type: String,
      required: true,
    },
    titleEn: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Hashtags = mongoose.model("hashtags", hashtagSchema);
module.exports = Hashtags;