const express = require("express");
const { handleGenerator } = require("../controller/url");
const router = express.Router();

router.post("/", handleGenerator);

module.exports = router;
