const mongoose = require("mongoose");
const VideoSchema = new mongoose.Schema(
  {
    video: {
      type: Array,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Videos = mongoose.model("video", VideoSchema);
module.exports = Videos;
