const router = require("express").Router();
const getUsers = require("../controllers/users");
const registerUser = require("../controllers/register");

router.get("/users", getUsers);
router.post("/register", registerUser);

module.exports = router;
