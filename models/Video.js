const mongoose = require("mongoose");
const VideoSchema = new mongoose.Schema(
  {
    video_link: {
      type: String,
      required : true,
    },
    image_link: {
      type: String,
      default: "https://index-eosin.vercel.app/image%2056.png",
      required : true,
    },
  },
  { timestamps: true }
);

const Videos = mongoose.model("video", VideoSchema);
module.exports = Videos;