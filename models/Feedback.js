const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    admin: {
      name: {
        type: String,
      },
      answer: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    actions: {
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
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  { timestamps: true }
);

const Feedbacks = mongoose.model("feedback", FeedbackSchema);
module.exports = Feedbacks;