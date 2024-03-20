const Feedback = require("../models/Feedback");

exports.getAllFeedbacks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalFeedbacks, allFeedbacks] = await Promise.all([
      Feedback.countDocuments(),
      Feedback.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalFeedbacks / perPage);
    if (allFeedbacks.length === 0) {
      return res.status(404).json({ data: [] });
    }
    return res.json({
      data: allFeedbacks,
      page,
      totalPages,
      totalItems: totalFeedbacks,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    return res.status(200).json({ data: feedback });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    return res.status(201).json({ data: newFeedback });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateFeedback = async (req, res) => {
  try {
    const { like, dislike, status } = req.body.actions;
    const oldFeedback = await Feedback.findById(req.params.id);
    if (!oldFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "actions.like": like,
          "actions.dislike": dislike,
          "actions.updatedAt": new Date(),
          "actions.status": status,
        },
      },
      { new: true }
    );
    return res.status(200).json({ data: updatedFeedback });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    return res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};