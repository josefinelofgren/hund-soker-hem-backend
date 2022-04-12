var express = require("express");
var router = express.Router();
const cors = require("cors");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/submit", function (req, res, next) {
  let newRegistrationOfInterest = req.body;

  req.app.locals.db
    .collection("registration-of-interest")
    .insertOne(newRegistrationOfInterest),
    function (err, result) {
      if (err) {
        console.log("ERROR");
      }
      if (result) {
        res.send(true);
        console.log('Registration sent')
      }
    };
});

module.exports = router;
