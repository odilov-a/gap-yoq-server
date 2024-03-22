const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    number: {
      type: String,
    },
    telegram: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("user", UserSchema);
module.exports = Users;