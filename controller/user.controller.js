const Users = require("../models/User");
const { sign } = require("../utils/jwt");
const bcrypt = require("bcrypt");

exports.getMe = async (req, res) => {
  try {
    const { userId } = req.headers;
    const findUser = await Users.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }
    return res.json({
      data: {
        token: sign(findUser._id),
        login: findUser.login,
      },
    });
  } catch (err) {
    return res.json(err);
  }
};

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    const existingUser = await Users.findOne({ login });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this login already exists",
      });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new Users({
      login,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.json({
      data: {
        token: sign(savedUser._id.toString()),
        login: savedUser.login,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    const findUser = await Users.findOne({ login });
    if (!findUser) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }
    const isPasswordValid = bcrypt.compareSync(password, findUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid login credentials",
      });
    }
    return res.json({
      data: {
        token: sign(findUser._id.toString()),
        login: findUser.login,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { userId } = req.headers;
    const { newLogin, newPassword } = req.body;
    const findUser = await Users.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }
    if (newLogin) {
      findUser.login = newLogin;
    }
    if (newPassword) {
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      findUser.password = hashedPassword;
    }
    const updatedUser = await findUser.save();
    return res.json({
      data: { updatedUser },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};