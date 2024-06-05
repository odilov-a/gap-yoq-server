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
const Partner = mongoose.model("partners", PartnerSchema);
module.exports = Partner;