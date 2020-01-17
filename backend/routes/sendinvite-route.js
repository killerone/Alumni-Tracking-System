const express = require("express");
const sgMail = require("@sendgrid/mail");

const routes = express.Router();

routes.post("", (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const body = "Hello " + name + ", join the alumni protal.";

  const msg = {
    to: email,
    from: "testmail@gmail.com",
    subject: "Invitation to join Alumni Protal",
    text: body
  };

  sgMail
    .send(msg)
    .then(result => {
      console.log("Invite sent");
      res.status(200).json({ message: "Invite Sent" });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(400).json({ message: "Invite Fail" });
    });
});

module.exports = routes;
