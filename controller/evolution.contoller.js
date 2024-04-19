const Evolution = require("../models/Evolution");

exports.getAllEvolution = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalEvolution, allEvolution] = await Promise.all([
      Evolution.countDocuments(),
      Evolution.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalEvolution / perPage);
    const currentPage = page;
    const totalCount = totalEvolution;
    const pageCount = Math.ceil(totalCount / perPage);
    if (allEvolution.length === 0) {
      return res.status(404).json({ message: [] });
    }
    return res.json({
      data: allEvolution,
      _meta: { currentPage, perPage, totalCount, pageCount },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getEvolutionById = async (req, res) => {
  try {
    const evolution = await Evolution.findById(req.params.id);
    if (!evolution) {
      return res.status(404).json({ message: "Evolution not found" });
    }
    return res.json({ data: evolution });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createEvolution = async (req, res) => {
  try {
    const newEvolution = await Evolution({
      year: req.body.year,
      description: req.body.description,
    });
    const savedEvolution = await newEvolution.save();
    return res.json({ data: savedEvolution });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateEvolution = async (req, res) => {
  try {
    const updatedEvolution = await Evolution.findByIdAndUpdate(
      req.params.id,
      {
        year: req.body.year,
        description: req.body.description,
      },
      { new: true }
    );
    if (!updatedEvolution) {
      return res.status(404).json({ message: "Evolution not found" });
    }
    return res.json({ data: updatedEvolution });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteEvolution = async (req, res) => {
  try {
    const deletedEvolution = await Evolution.findByIdAndDelete(req.params.id);
    if (!deletedEvolution) {
      return res.status(404).json({ message: "Evolution not found" });
    }
    return res.json({ message: "Evolution deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
