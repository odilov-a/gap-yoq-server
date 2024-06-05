const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("feedbacks", FeedbackSchema);
module.exports = Feedback;