const cors = require('cors');
const express = require('express');
var path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
const host = '0.0.0.0';
require("dotenv").config();

var indexRouter = require('./routes/index');
var availableDogsRouter = require('./routes/available-dogs');
registrationOfInterestRouter = require('./routes/registration-of-interest');

// connect to database
const MongoClient = require("mongodb").MongoClient;
const { log } = require("console");

MongoClient.connect(process.env.DB_CLOUD, {
  useUnifiedTopology: true,
}).then((client) => {
  console.log("Database connected");

  const db = client.db("PawPatrol");
  app.locals.db = db;
});

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  console.log("Server responding")
  res.send("Hello from Heroku");
})

app.use('/', indexRouter);
app.use('/available-dogs', availableDogsRouter);
app.use('/registration-of-interest', registrationOfInterestRouter);


