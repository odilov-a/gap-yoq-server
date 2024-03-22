const Feedback = require("../models/Feedback");

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    return res.status(200).json({ data: feedbacks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    return res.status(200).json({ data: feedback });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    return res.status(201).json({ data: newFeedback });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    return res.status(200).json({ data: updatedFeedback });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.likeFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    feedback.like += 1;
    await feedback.save();
    return res.status(200).json({ data: feedback });
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};

exports.dislikeFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    feedback.dislike += 1;
    await feedback.save();
    return res.status(200).json({ data: feedback });
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    return res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};