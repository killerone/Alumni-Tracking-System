const express = require("express");
const multer = require("multer");

const Event = require("../models/event-model");
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

// get all events
router.post("", (req, res, next) => {
  Event.find({})
    .then(events => {
      res.status(200).json({ event: events });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({ message: "Error" });
    });
});

// add a event
router.post(
  "/add",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    let event;
    if (req.file) {
      event = new Event({
        title: req.body.title,
        description: req.body.description,
        participants: [],
        eventDate: req.body.eventDate,
        image: url + "/images/post/" + req.file.filename
      });
    } else {
      event = new Event({
        title: req.body.title,
        description: req.body.description,
        participants: [],
        eventDate: req.body.eventDate
      });
    }

    event
      .save()
      .then(result => {
        console.log(result);
        res.status(200).json({ message: "Event added.." });
      })
      .catch(error => {
        console.log(error);
        res.status(501).json({ message: "Event not added.." });
      });
  }
);


// join a particular event
router.post("/join/:id", (req, res, next) => {
  const userid = req.body.uid;
  Event.findById(req.params.id)
    .then(fetchedEvent => {
      let participants = fetchedEvent.participants;
      console.log(userid);
      console.log(participants);
      if (!participants.includes(userid)) {
        participants.push(userid);
        fetchedEvent
          .updateOne({ participants: participants })
          .then(result => {
            res.status(200).json({ msg: "You are added." });
            next();
          })
          .catch(err => {
            console.log(err);
            res.status(501).json({ message: "User update unsuccessful." });
            next();
          });
      }
      res.status(200).json({ msg: "Already joined." });
    })
    .catch(err => {
      console.log(err);
      res.status(501).json({ message: "User update unsuccessful." });
    });
});


// delete a event
router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Event.findByIdAndDelete(req.params.id)
    .then(res => {
      res.status(200).json("Event deleted....");
    })
    .catch(err => {
      res.status(401).json("Event not deleted....");
    });
});


// get a particular event
router.get("/:id", (req, res, next) => {
  Event.findById(req.params.id)
    .then(fetchedEvent => {
      res.status(200).json({ event: fetchedEvent });
    })
    .catch(err => {
      console.log(err);
      res.status(501).json({ message: "User update unsuccessful." });
    });
});

module.exports = router;
