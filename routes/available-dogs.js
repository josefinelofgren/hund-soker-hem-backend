var express = require("express");
var router = express.Router();
const cors = require("cors");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/all-dogs", function (req, res, next) {
  req.app.locals.db
    .collection("available-dogs")
    .find()
    .toArray()
    .then((results) => {
      res.json(results);
    });
});

router.post("/selected-dog", function (req, res, next) {
  req.app.locals.db
    .collection("available-dogs")
    .findOne({ path: req.body.path }, function (err, result) {
      if (err) {
        console.log("ERROR");
      }
      if (result) {
        res.send(result);
      }
    });
});

router.post("/matched-dogs", function (req, res, next) {
  req.app.locals.db
    .collection("available-dogs")
    .find({
      kids: req.body.kids,
      dogs: req.body.dogs,
      cats: req.body.cats,
      activityLevel: req.body.activityLevel,
    })
    .toArray()
    .then((results) => {
      res.json(results);
    });
});

module.exports = router;
