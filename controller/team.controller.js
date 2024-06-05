const Team = require("../models/Team");
const paginate = require("../utils/pagination");
const filterByLang = require("../utils/filterByLang");

exports.getAll = async (req, res) => {
  try {
    const data = await paginate(Team, req.query, "team", "position");
    const result = filterByLang(data.data, req.query.lang, 'level', 'position.name');
    data.data = result;
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addTeam = async (req, res) => {
  try {
    req.body.images = req.images;
    const newTeam = new Team({
      ...req.body,
    });
    await newTeam.save();
    return res.status(201).json({
      data: newTeam,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.updateTeam = async (req, res) => {
  try {
    if (req.images) {
      req.body.images = req.images;
    }
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updatedTeam) {
      return res.json(updatedTeam);
    }
    return res.json({
      data: updatedTeam,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({
        message: "Team Not Found",
      });
    }
    return res.json({
      message: "Team deleted!",
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
