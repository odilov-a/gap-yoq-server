const mongoose = require("mongoose");
const VideoSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required : true,
    },
  },
  { timestamps: true }
);

const Videos = mongoose.model("video", VideoSchema);
module.exports = Videos;