const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerator(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ err: "URL is required" });
  }

  const shortID = shortid.generate(); // Generate a unique short ID
  try {
    console.log(shortID);
    const urlEntry = await URL.create({
      shortId: shortID, // Use the generated short ID here
      redirecturl: body.url,
      visitHistory: [],
    });
    //rendering too home page directly as o/p avaliable
    return res.render("home", { id: shortID });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Failed to create URL entry" });
  }
}

async function handleGETAnalytics(req, res) {
  const shortId = req.params.shortid;
  try {
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ err: "Short URL not found" });
    }
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Failed to fetch analytics" });
  }
}

module.exports = { handleGenerator, handleGETAnalytics };
