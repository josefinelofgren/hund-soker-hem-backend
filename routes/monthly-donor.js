var express = require("express");
var router = express.Router();
const cors = require("cors");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/submit", function (req, res, next) {
  let newMonthlyDonor = req.body;

  req.app.locals.db
    .collection("monthly-donor")
    .insertOne(newMonthlyDonor),
    function (err, result) {
      if (err) {
        console.log("ERROR");
      }
      if (result) {
        res.send(true);
        console.log("Monthly donor registered");
      }
    };
});

module.exports = router;