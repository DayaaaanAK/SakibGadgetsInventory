const express = require("express");
const router = express.Router();

const { login, logout } = require("../controllers/admin.controller");
const { authenticateAdmin } = require("../middlewares/auth");

router.post("/login", login);

router.get("/logout", authenticateAdmin, logout);

module.exports = router;
