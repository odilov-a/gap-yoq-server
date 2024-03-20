const mongoose = require("mongoose");
const PartnerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required : true,
    },
    image: {
      type: Array,
      required : true,
    },
  },
  { timestamps: true }
);
const Partners = mongoose.model("partner", PartnerSchema);
module.exports = Partners;