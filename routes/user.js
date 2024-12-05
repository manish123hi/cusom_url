const express = require("express");
const router = express.Router();
const { handleusersignup, handleUserLogin } = require("../controller/user");
router.post("/", handleusersignup);
router.post("/login", handleUserLogin);

module.exports = router;
