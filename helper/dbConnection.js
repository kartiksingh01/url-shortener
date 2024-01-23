const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log("MongoDB Connected...");
    } else {
      console.log("Connection Failed to DB");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
module.exports = dbConnection