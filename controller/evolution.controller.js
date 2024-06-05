const Evolution = require("../models/Evolution.js");
const paginate = require("../utils/pagination.js");

exports.getAllEvolutions = async (req, res) => {
  try {
    const data = await paginate(Evolution, req.query);
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addEvolution = async (req, res) => {
  try {
    const newEvolution = new Evolution({ ...req.body });
    await newEvolution.save();
    return res.status(201).json({
      message: "Evolution Created",
      data: newEvolution,
    })
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.updateEvolution = async (req, res) => {
  try {
    const findEvolution = await Evolution.findByIdAndUpdate(req.params.id,
      { ...req.body },
      { new: true },
    );
    if(!findEvolution) {
      return res.status(404).json({
        message: "Evolution Not Found!"
      });
    };
    return res.json({
      message: "Evolution Updated!",
      data: findEvolution,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteEvolution = async (req, res) => {
  try {
    const findEvolution = await Evolution.findByIdAndDelete(req.params.id);
    if(!findEvolution) {
      return res.status(404).json({
        message: "Evolution Not Found!",
      })
    };
    return res.json({
      message: "Evolution Deleted",
    });
  } catch (err) {
    return res.status(400).json(err)
  }
};
