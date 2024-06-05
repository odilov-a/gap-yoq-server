const mongoose = require("mongoose");
const evolutionSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required : true
    },
    descriptionUz: {
      type: String,
      required : true
    },
    descriptionEn: {
      type: String,
      required : true
    },
    descriptionRu: {
      type: String,
      required : true
    },
  },
  { timestamps: true }
);

const Evolution = mongoose.model("evolutions", evolutionSchema);
module.exports = Evolution;