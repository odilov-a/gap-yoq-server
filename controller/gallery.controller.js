const Galleries = require("../models/Gallery");

exports.getAllGallery = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalGalleries = await Galleries.countDocuments();
    const totalPages = Math.ceil(totalGalleries / perPage);
    const galleries = await Galleries.find({})
      .skip((page - 1) * perPage)
      .limit(perPage);
    if (!galleries || galleries.length === 0) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    return res.json({
      data: galleries,
      page,
      totalPages,
      totalItems: totalGalleries,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getGalleryById = async (req, res) => {
  try {
    const gallery = await Galleries.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    return res.json({ data: gallery });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createGallery = async (req, res) => {
  try {
    req.body.image = req.images;
    const newGallery = await Galleries.create(req.body);
    return res.json({ data: newGallery });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    if (req.images && req.images.length <= 0) {
      return res.status(400).json({ message: "Invalid gallery image array" });
    }
    req.body.image = req.images;
    const updatedGallery = await Galleries.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    return res.json({ data: updatedGallery });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const deletedGallery = await Galleries.findByIdAndDelete(
      req.params.id
    );
    if (!deletedGallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }
    return res.json({ message: "Gallery deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};