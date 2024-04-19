const Feedback = require("../models/Feedback");

exports.getAllFeedback = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalFeedback, allFeedback] = await Promise.all([
      Feedback.countDocuments(),
      Feedback.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalFeedback / perPage);
    const currentPage = page;
    const totalCount = totalFeedback;
    const pageCount = Math.ceil(totalCount / perPage);
    if (allFeedback.length === 0) {
      return res.status(404).json({ message: [] });
    }
    return res.status(200).json({
      data: allFeedback,
      _meta: { currentPage, perPage, totalCount, pageCount },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

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