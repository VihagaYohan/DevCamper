const express = require("express");
const dotenv = require("dotenv");

// load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/", (req, res) => {
  res.send("hello, world");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
