const PORT = process.env.PORT || 3000; //either heroku port or local port
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) { //handles get request
  res.render('index');
})


app.listen(PORT, function () {
  console.log('go to http://localhost:3000/')
})
