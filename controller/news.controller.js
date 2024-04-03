const News = require("../models/News");

exports.getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalNews, allNews] = await Promise.all([
      News.countDocuments(),
      News.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalNews / perPage);
    if (allNews.length === 0) {
      return res.status(404).json({ message: [] });
    }
    return res.json({
      data: allNews,
      page,
      totalPages,
      totalItems: totalNews,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json({ data: news });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { image, image02, image03 } = req.images;
    req.body.image = image;
    req.body.image02 = image02;
    req.body.image03 = image03;
    const newNews = new News({
      title: req.body.title,
      description: req.body.description,
      hashtag: req.body.hashtag,
      image: image,
      image02: image02,
      image03: image03,
    });
    await newNews.save();
    return res.json({ data: newNews });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    if (!req.images || req.images.length <= 0) {
      return res.status(400).json({ message: "Invalid image length" });
    }
    const oldNews = await News.findById(req.params.id);
    if (!oldNews) {
      return res.status(404).json({ message: "News not found" });
    }
    const { image, image02, image03 } = req.images;
    let updateData = {};
    if (req.body.title) {
      updateData.title = req.body.title;
    }
    if (req.body.description) {
      updateData.description = req.body.description;
    }
    if (req.body.hashtag) {
      updateData.hashtag = req.body.hashtag;
    }
    if (image.length !== 0) {
      updateData.image = image;
    }
    if (image02.length !== 0) {
      updateData.image02 = image02;
    }
    if (image03.length !== 0) {
      updateData.image03 = image03;
    }
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    const news = await News.findById(req.params.id);
    return res.json({ data: news });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json({ message: "News deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
