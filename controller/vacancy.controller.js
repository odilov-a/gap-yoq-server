const Vacancy = require("../models/Vacancy");
const paginate = require("../utils/pagination");
const filterByLang = require("../utils/filterByLang");

exports.getAll = async (req, res) => {
  try {
    const data = await paginate(Vacancy, req.query, "vacancies");
    const result = filterByLang(data.data, req.query.lang, "description");
    data.data = result;
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addVacancy = async (req, res) => {
  try {
    const newVacancy = new Vacancy({ ...req.body });
    await newVacancy.save();
    return res.json({
      data: newVacancy,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.updateVacancy = async (req, res) => {
  try {
    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updatedVacancy) {
      return res.status(404).json({
        message: "Vacancy Not Found!",
      });
    }
    return res.json({
      data: updatedVacancy,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteVacancy = async (req, res) => {
  try {
    const deletedVacancy = await Vacancy.findByIdAndDelete(req.params.id);
    if (!deletedVacancy) {
      return res.status(404).json({
        message: "Vacancy Not Found!",
      });
    }
    return res.json({
      data: deletedVacancy,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
