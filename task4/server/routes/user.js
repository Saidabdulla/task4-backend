const router = require("express").Router();
const getUsers = require("../controllers/users");
const registerUser = require("../controllers/register");
const loginUser = require("../controllers/login");
const { protect } = require("../middleware/auth");
const { blockUsers, deleteUsers } = require("../controllers/actions");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", protect, getUsers);
router.get("/users/delete", protect, deleteUsers);
router.get("/users/:status", protect, blockUsers);

module.exports = router;
