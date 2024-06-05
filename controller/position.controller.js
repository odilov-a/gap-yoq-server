const Positions = require("../models/Position");
const paginate = require("../utils/pagination");
const filterByLang = require("../utils/filterByLang");

exports.getAll = async (req, res) => {
  try {
    const data = await paginate(Positions, req.query, "positions");
    const result = filterByLang(data.data, req.query.lang, 'name');
    data.data = result;
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addPosition = async (req, res) => {
  try {
    const newPosition = new Positions({
      ...req.body,
    });
    await newPosition.save();
    return res.status(201).json({
      data: newPosition,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.updatePosition = async (req, res) => {
  try {
    const updatedPosition = await Positions.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedPosition) {
      return res.status(404).json({
        message: "Position Not Found!",
      });
    }
    return res.json({
      data: updatedPosition,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deletePosition = async (req, res) => {
  try {
    const deletedPosition = await Positions.findByIdAndDelete(req.params.id);
    if(!deletedPosition) {
      return res.status(404).json({
        message: "Position Not found!",
      });
    };
    return res.json({
      message: "Position deleted"
    })
  } catch (err) {
    return res.status(400).json(err);
  }
};
