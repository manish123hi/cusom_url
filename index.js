const express = require("express");
const urlRoute = require("./routes/url");
const { coonectToMongodb } = require("./connect");
const cookieParser = require("cookie-parser");
const { restrictToLoginUserOnly } = require("./middleware/auth");

const path = require("path");
const app = express();
const PORT = 5000;

const stasticRoute = require("./routes/stasticRoute");
const URL = require("./models/url");

const userRoute = require("./routes/user");

coonectToMongodb("mongodb://localhost:27017/short-url").then(() => {
  console.log("mongo is connected");
});

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
///
app.use("/user", userRoute);
app.use("/url", restrictToLoginUserOnly, urlRoute); //must need to logined before geeting into generating cookies
app.use("/", stasticRoute);

///
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    console.log("Received shortId:", shortId); // Debug log

    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }, //beacuse this is an array we push here
      { new: true }
    );

    if (!entry) {
      console.log("No entry found for shortId:", shortId);
      return res.status(404).json({ error: "Short URL not found" });
    }

    console.log("Redirecting to:", entry.redirecturl);
    return res.redirect(entry.redirecturl);
  } catch (error) {
    console.error("Error during redirection:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`the port is activatred at ${PORT}`));
