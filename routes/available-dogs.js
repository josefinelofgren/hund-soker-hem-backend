var express = require('express');
var router = express.Router();
const cors = require('cors');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

router.get('/all-dogs', function(req, res, next) {
   req.app.locals.db.collection('available-dogs').find().toArray()
    .then(results => {
      res.json(results);
    })
});

router.post('/selected-dog', function(req, res, next) {
    console.log(req.body);

    req.app.locals.db.collection('available-dogs').findOne({"path" : req.body.path}, function (err, result){
        if (err){
          console.log("ERROR"); 
    } if(result) {
        res.send(result);
    }
  })
 });
 

module.exports = router;
