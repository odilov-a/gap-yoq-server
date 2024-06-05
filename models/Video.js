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

const Video = mongoose.model("videos", VideoSchema);
module.exports = Video;