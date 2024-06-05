const mongoose = require("mongoose");
const PositionSchema = new mongoose.Schema({
  nameUz: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
  nameRu: {
    type: String,
    required: true,
  },
});

const Positions = mongoose.model("positions", PositionSchema);
module.exports = Positions;