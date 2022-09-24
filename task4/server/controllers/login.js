const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      const updatedUser = await userModel.findOneAndUpdate(
        { email: email.toLowerCase() },
        {
          login_time: new Date(),
        },
        {
          new: true,
        }
      );

      const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({ name: updatedUser.name, email: updatedUser.email, token });
    } else res.status(404).json({ error: "Invalid credentials." });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = loginUser;
