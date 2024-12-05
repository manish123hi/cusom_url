const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleusersignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body; // Destructure email and password from request body

  // Assuming 'User' is your model
  const user = await User.findOne({ email, password }); // Find user with matching email and password

  if (!user) {
    // Render login page with error if user not found
    return res.render("login", {
      error: "Invalid email or password",
    });
  }
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");

  // Redirect to home page if login successful
  return res.redirect("/");
}
module.exports = { handleusersignup, handleUserLogin };
