const mongoose = require("mongoose");
const evolutionSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required : true
    },
    description: {
      type: String,
      required : true
    },
  },
  { timestamps: true }
);

const Evolution = mongoose.model("evolution", evolutionSchema);
module.exports = Evolution;