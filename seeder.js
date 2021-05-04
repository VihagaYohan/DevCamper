const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotEnv = require("dotenv");

// load env variable
dotEnv.config({ path: "./config/config.env" });

// load models
const { Bootcamp } = require("./models/Bootcamp");

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/data/bootcamps.json`, "utf-8")
);

// import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();

    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  console.log("delete");
  deleteData();
}
