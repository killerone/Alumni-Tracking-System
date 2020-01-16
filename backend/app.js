const express = require("express");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

const inviteRoute = require("./routes/sendinvite-route");
const userRoute = require("./routes/user-route");
const noticeRoute = require("./routes/notice-route");
const eventRoute = require("./routes/event-route");

const app = express();

// database connection
mongoose
  .connect("mongodb://localhost:27017/AlumniTracking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to database.....");
  })
  .catch(() => {
    console.log("Database connection failed.....");
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
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// ROUTES
app.use("/invite", inviteRoute);
app.use("/user", userRoute);
app.use("/notice", noticeRoute);
app.use("/event", eventRoute);

module.exports = app;
