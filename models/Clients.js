const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
});

const Clients = mongoose.model("clients", ClientSchema);
module.exports = Clients;