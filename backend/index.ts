// requirements
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool_module = require("./db");

//middleware
app.use(cors());
app.use(express.json());

// start server
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
