const Hashtag = require("../models/Hashtag.js");
const paginate = require("../utils/pagination.js");
const filterByLang = require("../utils/filterByLang.js");

exports.getAllHashtags = async (req, res) => {
  try {
    const data = await paginate(Hashtag, req.query);
    const result = filterByLang(data.data, req.query.lang, "title");
    data.data = result;
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addHashtag = async (req, res) => {
  try {
    const newHashtag = new Hashtag({ ...req.body });
    await newHashtag.save();
    return res.status(201).json({
      message: "Hashtag Created",
      data: newHashtag,
    })
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.updateHashtag = async (req, res) => {
  try {
    const findHashtag = await Hashtag.findByIdAndUpdate(req.params.id,
      { ...req.body },
      { new: true },
    );
    if(!findHashtag) {
      return res.status(404).json({
        message: "Hashtag Not Found!"
      });
    };
    return res.json({
      message: "Hashtag Updated!",
      data: findHashtag,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteHashtag = async (req, res) => {
  try {
    const findHashtag = await Hashtag.findByIdAndDelete(req.params.id);
    if(!findHashtag) {
      return res.status(404).json({
        message: "Hashtag Not Found!",
      })
    };
    return res.json({
      message: "Hashtag Deleted",
    });
  } catch (err) {
    return res.status(400).json(err)
  }
};
