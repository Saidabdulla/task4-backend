const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const { status_active } = require("../lib/constants");

const registerUser = async (req, res) => {
  try {
    const userExist = await userModel.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (userExist)
      return res.status(404).json({ error: "User already exist!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);

    const user = {
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      status: status_active,
      password: hashedPwd,
      login_time: null,
    };

    const savedUser = await userModel.create(user);
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = registerUser;
