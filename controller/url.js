const shortid = require("shortid"); // Ensure you use this library correctly
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

    return res.json({ id: shortID });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ err: "Failed to create URL entry" });
  }
}

async function handleGETGenerator(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOneAndUpdate({ shortId });
}

module.exports = { handleGenerator };
