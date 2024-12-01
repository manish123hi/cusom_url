const moongose = require("mongoose");

async function coonectToMongodb(url) {
  return moongose.connect(url);
}

module.exports = { coonectToMongodb };
