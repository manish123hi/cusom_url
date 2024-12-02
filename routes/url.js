const express = require("express");
const { handleGenerator, handleGETAnalytics } = require("../controller/url");
const router = express.Router();

router.post("/", handleGenerator);
router.get("/analy/:shortId", handleGETAnalytics);

module.exports = router;
