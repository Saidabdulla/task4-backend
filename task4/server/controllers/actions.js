const userModel = require("../models/user");
const { status_active, status_blocked } = require("../lib/constants");

const blockUsers = async (req, res) => {
  try {
    const params = req.query.id;
    const status = req.params.status;

    if (!params) {
      return res.status(404).json({ error: "Select at least one user." });
    }

    if (typeof params === "string") {
      await userModel.findByIdAndUpdate(params, {
        status: status === "active" ? status_active : status_blocked,
      });

      return res.status(200).json("User updated successfully!");
    }

    if (typeof params === "object") {
      params.forEach((id) => {
        userModel
          .findByIdAndUpdate(id, {
            status: status === "active" ? status_active : status_blocked,
          })
          .catch((err) => console.log(err));
      });

      return res.status(200).json("Users updated successfully!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const params = req.query.id;

    if (!params) {
      return res.status(404).json({ error: "Select at least one user." });
    }

    if (typeof params === "string") {
      await userModel.findByIdAndDelete(params);

      return res.status(200).json("User deleted successfully!");
    }

    if (typeof params === "object") {
      params.forEach((id) => {
        userModel.findByIdAndDelete(id).catch((err) => console.log(err));
      });

      return res.status(200).json("Users deleted successfully!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { blockUsers, deleteUsers };
