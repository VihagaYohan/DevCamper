const express = require("express");
const dotenv = require("dotenv");

// load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// route files
const bootcamps = require('./routes/bootcamps')

// mount route files
app.use('/api/v1/bootcamps',bootcamps)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
