const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')

// import middle-ware
const logger = require('./middleware/logging')

// load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// initialize middleware
//app.use(logger)

// dev logging middle-ware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

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
