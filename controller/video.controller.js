const Video = require("../models/Video");

exports.getAllVideo = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalVideo, allVideo] = await Promise.all([
      Video.countDocuments(),
      Video.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalVideo / perPage);
    if (allVideo.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }
    return res.json({
      data: allVideo,
      page,
      totalPages,
      totalItems: totalVideo,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.json({ data: video });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createVideo = async (req, res) => {
  try {
    if (!req.video) {
      return res.status(400).json({ message: "Video missing" });
    }
    req.body.video_link = req.video;
    const newVideo = await Video.create(req.body);
    return res.status(201).json({ data: newVideo });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const oldVideo = await Video.findById(req.params.id);
    if (!oldVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    if (!req.video) {
      return res.status(400).json({ message: "Video missing" });
    }
    req.body.video_link = req.video;
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json({ data: updatedVideo });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const deletedVideo = await Video.findByIdAndDelete(req.params.id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    return res.json({ message: "Video deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};