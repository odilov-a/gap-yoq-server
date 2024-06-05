const mongoose = require("mongoose");
const VacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  descriptionUz: {
    type: String,
    required: true,
  },
  descriptionRu: {
    type: String,
    required: true,
  },
  descriptionEn: {
    type: String,
    required: true,
  }
});

const Vacancies = mongoose.model("vacancies", VacancySchema);
module.exports = Vacancies;