const express = require("express");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  User.findOne({ email: req.body.email }).then(currentUser => {
    if (!currentUser) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: User.hashPassword(req.body.password),
        dob: req.body.dob,
        gender: req.body.gender || " ",
        location: req.body.location,
        college: req.body.college,
        batchYear: req.body.batchYear,
        profilePicture: req.body.profilePicture
      });

      user
        .save()
        .then(result => {
          console.log(result);
          res.status(200).json({ message: "Sign Up Successful" });
        })
        .catch(error => {
          console.log(error);
          res.status(501).json({ message: "Sign Up Unsuccessful" });
        });
    } else {
      res.status(501).json({ message: "User already exists" });
    }
  });
});

router.post("/login", (req, res) => {
  let fetchedUser;

  User.findOne({ email: req.body.email })
    .then(currentUser => {
      if (!currentUser) res.status(501).send({ message: "User not found" });

      fetchedUser = currentUser;
      return bcrypt.compare(req.body.password, fetchedUser.password);
    })
    .catch(err => {
      console.log("Error :", err);
    })
    .then(result => {
      if (!result) res.status(400).json({ message: "Password incorrect" });

      res.status(200).json({ user: fetchedUser });
    })
    .catch(err => {
      console.log("Error :", err);
    });
});

module.exports = router;
