const express = require("express");
const URL = require("../models/url");
const router = express.Router();
router.get("/", async (re1, res) => {
  const allurl = await URL.find({});

  return res.render("home", {
    url: allurl,
  });
});

module.exports = router;
