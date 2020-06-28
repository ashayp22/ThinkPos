const PORT = process.env.PORT || 3000; //either heroku port or local port
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "thinkpos-db.cpfgsfmpsgzi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  port: "3306",
  database: "quotes"
})

// connection.connect(function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Connected to database')
//   var sql = "CREATE TABLE allquotes (name VARCHAR(255), location VARCHAR(255), category VARCHAR(255), message VARCHAR(255))";
//   connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// })


app.get('/', function (req, res) { //handles get request
  res.render('index');
})

app.post('/quotes', function(req, res) {
  console.log("clicked");

  let name = req.body.name;
  let location = req.body.location;
  let category = req.body.category;
  let message = req.body.message;

  var sql = "INSERT INTO allquotes (name, location, category, message) VALUES ?";
  var data = [[name, location, category, message]];
  connection.query(sql, [data], function(error, results, fields) {
      if(error) {
        res.json({error: true, message: "There has been an error. Please try again."});
        res.end();
      } else {
        res.json({error: false, message: "The quote has been added!"});
        res.end();
      }
  });
})

app.get('/quotes', function(req, res) {
  connection.query('SELECT * FROM allquotes', function(error, results, fields) {

      if(error) {
        return res.json({data: []});
        res.end();
      } else {
        data = [];
        for(var i = 0; i < results.length; i++) {
          data.push({name: results[i].name, location: results[i].location, category: results[i].category, message: results[i].message})
        }
        return res.json({data: data});
        res.end();
      }
  });
})


app.listen(PORT, function () {
  console.log('go to http://localhost:3000/')
})
