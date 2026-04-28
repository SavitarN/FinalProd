require("dotenv").config();
//Imported File for database
require("./database/connection");
const PORT = process.env.PORT || 5000;

// Imported files for saveData and getData for excell file
const saveData = require("./routes/saveDataRoute");
const getData = require("./routes/getDataRoute");

// Imported Map routes for wards and districts
const getWards = require("./routes/getWardRoute");
const getDistricts = require("./routes/getDistrictRoute");

// Library imports
const express = require("express");
const cors = require("cors");
const status = require("express-status-monitor");

//Object Initilization
const app = express();

//Server modifications
app.use(cors());
app.use(express.json());
app.use(status());

//Routes
app.use("/data", saveData, getData);

//Map Routes
app.use("/map", getWards, getDistricts);

//Server Running

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
