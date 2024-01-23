const express = require("express");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConnection = require("./helper/dbConnection");
dbConnection();
const { redisConnection } = require("./helper/redisConnection");
redisConnection();
//Routes
const urlShortenerRoutes = require("./routes/urlShortener.routes");

app.use("/api/urlShortener", urlShortenerRoutes);
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
