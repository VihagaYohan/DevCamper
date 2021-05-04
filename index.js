const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// import DB connection
const connectDB = require("./config/db");

// import middle-ware
const logger = require("./middleware/logging");
const errorHandler = require("./middleware/error");

// load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// body pharser
app.use(express.json());

// connect to database
connectDB();

// initialize middleware
//app.use(logger)

// dev logging middle-ware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

app.use(errorHandler);

// mount route files
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  );
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`.red);
  // close server and exit process
  server.close(() => process.exit(1));
});
