const Dealer = require("../models/Dealer.js");
const paginate = require("../utils/pagination.js");

exports.getAllDealers = async (req, res) => {
  try {
    const data = await paginate(Dealer, req.query);
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addDealer = async (req, res) => {
  try {
    const newDealer = new Dealer({ ...req.body });
    await newDealer.save();
    return res.status(201).json({
      message: "Dealer Created",
      data: newDealer,
    })
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.updateDealer = async (req, res) => {
  try {
    const findDealer = await Dealer.findByIdAndUpdate(req.params.id,
      { ...req.body },
      { new: true },
    );
    if(!findDealer) {
      return res.status(404).json({
        message: "Dealer Not Found!"
      });
    };
    return res.json({
      message: "Dealer Updated!",
      data: findDealer,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteDealer = async (req, res) => {
  try {
    const findDealer = await Dealer.findByIdAndDelete(req.params.id);
    if(!findDealer) {
      return res.status(404).json({
        message: "Dealer Not Found!",
      })
    };
    return res.json({
      message: "Dealer Deleted",
    });
  } catch (err) {
    return res.status(400).json(err)
  }
};
