const express = require("express");
const multer = require("multer");
const bcrypt = require("bcryptjs");

const User = require("../models/user-model");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  // destination on server where file will save
  destination: (req, file, cb) => {
    cb(null, "backend/images");
  },
  // changing the name of file
  filename: (req, file, cb) => {
    const name = req.body.name
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];

    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "/signup",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    User.findOne({ email: req.body.email }).then(currentUser => {
      if (!currentUser) {
        const user = this.createUserObject(req);
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
  }
);

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

router.post(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(fetchedUser => {
        res
          .status(200)
          .json({ message: "Update successful", user: fetchedUser });
      })
      .catch(err => {
        res.status(200).json({ message: "Update unsuccessful", error: err });
      });
  }
);

router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(fetchedUser => {
      result => {
        res.status(200).json({ newuser: fetchedUser });
      };
    })
    .catch(err => {
      console.log(err);
      res.status(501).json({ message: "User update unsuccessful." });
    });
});

function createUserObject(req) {
  const url = req.protocol + "://" + req.get("host");
  var user;
  if (req.file) {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      location: req.body.location,
      college: req.body.college,
      batchYear: req.body.batchYear,
      profilePicture: url + "/images/" + req.file.filename
    });
  } else {
    user = new User({
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      location: req.body.location,
      college: req.body.college,
      batchYear: req.body.batchYear
    });
  }

  return user;
}

module.exports = router;
