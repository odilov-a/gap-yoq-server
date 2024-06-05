const Partner = require("../models/Partner.js");
const paginate = require("../utils/pagination.js");

exports.getAllPartners = async (req, res) => {
  try {
    const data = await paginate(Partner, req.query);
    data.data = result;
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addPartner = async (req, res) => {
  try {
    req.body.images = req.images;
    const newPartner = new Partner({
      ...req.body,
    });
    await newPartner.save();
    return res.status(201).json({
      data: newPartner,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.updatePartner = async (req, res) => {
  try {
    if(req.images.length > 0) {
      req.body.images = req.images;
    }
    const findPartner = await Partner.findByIdAndUpdate(req.params.id,
      { ...req.body },
      { new: true },
    );
    if(!findPartner) {
      return res.status(404).json({
        message: "Partner Not Found!"
      });
    };
    return res.json({
      message: "Partner Updated!",
      data: findPartner,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const findPartner = await Partner.findByIdAndDelete(req.params.id);
    if (!findPartner) {
      return res.status(404).json({
        message: "Partner Not Found!",
      });
    }
    return res.json({
      message: "Partner deleted",
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
