const mongoose = require("mongoose");
const dealerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required : true
    },
    address: {
      type: String,
      required : true
    },
    number: {
      type: String,
      required : true
    },
  },
  { timestamps: true }
);

const Dealer = mongoose.model("dealers", dealerSchema);
module.exports = Dealer;