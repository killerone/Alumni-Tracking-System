const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// database connection
mongoose
  .connect("mongodb://localhost:27017/AlumniTracking", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database.....");
  })
  .catch(() => {
    console.log("Connection failed.....");
  });

app.use(bodyParse.json());
app.use("/images", express.static(path.join("backend/images"))); // to make images folder access statically

// for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH",
    "PUT"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

module.exports = app;
