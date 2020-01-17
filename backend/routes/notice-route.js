const express = require("express");
const multer = require("multer");

const Notice = require("../models/notice-model");
const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  // destination on server where file will save
  destination: (req, file, cb) => {
    cb(null, "backend/images/post");
  },
  // changing the name of file
  filename: (req, file, cb) => {
    const name = req.body.title
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];

    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

// get all notice
router.post("", (req, res, next) => {
  Notice.find({})
    .then(notice => {
      res.status(200).json({ notice: notices });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({ message: "Error" });
    });
});

// add new notice
router.post(
  "/add",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    let notice;
    if (req.file) {
      notice = new Notice({
        title: req.body.title,
        image: url + "/images/post/" + req.file.filename
      });
    } else {
      notice = new Notice({
        title: req.body.title
      });
    }

    notice
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({ message: "Notice added.." });
      })
      .catch(error => {
        console.log(error);
        res.status(501).json({ message: "Notice not added.." });
      });
  }
);

// delete a notice
router.delete("/:id", (req, res, next) => {
  Notice.findByIdAndDelete(req.params.id)
    .then(res => {
      res.status(200).json("Event deleted....");
    })
    .catch(err => {
      res.status(401).json("Event not deleted....");
    });
});

// get a particular notice
router.get("/:id", (req, res, next) => {
  Notice.findById(req.params.id)
    .then(fetchedNotice => {
      res.status(200).json({ notice: fetchedNotice });
    })
    .catch(err => {
      console.log(err);
      res.status(501).json({ message: "User update unsuccessful." });
    });
});

module.exports = router;
