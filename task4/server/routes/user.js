const router = require("express").Router();
const getUsers = require("../controllers/users");
const registerUser = require("../controllers/register");
const loginUser = require("../controllers/login");

router.get("/users", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
