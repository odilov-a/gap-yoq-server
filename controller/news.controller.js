const News = require("../models/News.js");
const paginate = require("../utils/pagination.js");
const filterByLang = require("../utils/filterByLang.js");

exports.getAllNews = async (req, res) => {
  try {
    const data = await paginate(News, req.query, "title", "description");
    const result = filterByLang(data.data, req.query.lang, "hashtag.title");
    data.data = result;
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addNews = async (req, res) => {
  try {
    req.body.image = req.image;
    req.body.image02 = req.image02;
    req.body.image03 = req.image03;
    const newNews = new News({
      ...req.body,
    });
    await newNews.save();
    return res.status(201).json({
      data: newNews,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.updateNews = async (req, res) => {
  try {
    if(req.image.length > 0) {
      req.body.image = req.image;
    }
    if(req.image02.length > 0) {
      req.body.image02 = req.image02;
    }
    if(req.image03.length > 0) {
      req.body.image03 = req.image03;
    }
    const findNews = await News.findByIdAndUpdate(req.params.id,
      { ...req.body },
      { new: true },
    );
    if(!findNews) {
      return res.status(404).json({
        message: "News Not Found!"
      });
    };
    return res.json({
      message: "News Updated!",
      data: findNews,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const findNews = await News.findByIdAndDelete(req.params.id);
    if (!findNews) {
      return res.status(404).json({
        message: "News Not Found!",
      });
    }
    return res.json({
      message: "News deleted",
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
