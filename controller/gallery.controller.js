const Gallery = require("../models/Gallery.js");
const paginate = require("../utils/pagination.js");
const filterByLang = require("../utils/filterByLang.js");

exports.getAllGalleries = async (req, res) => {
  try {
    const data = await paginate(Gallery, req.query);
    const result = filterByLang(data.data, req.query.lang, "type");
    data.data = result;
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addGallery = async (req, res) => {
  try {
    req.body.images = req.images;
    const newGallery = new Gallery({
      ...req.body,
    });
    await newGallery.save();
    return res.status(201).json({
      data: newGallery,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.updateGallery = async (req, res) => {
  try {
    if(req.images.length > 0) {
      req.body.images = req.images;
    }
    const findGallery = await Gallery.findByIdAndUpdate(req.params.id,
      { ...req.body },
      { new: true },
    );
    if(!findGallery) {
      return res.status(404).json({
        message: "Gallery Not Found!"
      });
    };
    return res.json({
      message: "Gallery Updated!",
      data: findGallery,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const findGallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!findGallery) {
      return res.status(404).json({
        message: "Gallery Not Found!",
      });
    }
    return res.json({
      message: "Gallery deleted",
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
