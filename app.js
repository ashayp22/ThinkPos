const PORT = process.env.PORT || 3000; //either heroku port or local port
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var xss = require("xss");
require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.HOST,
  user: "admin",
  password: process.env.PASSWORD,
  port: "3306",
  database: "quotes"
})

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   connection.query("CREATE DATABASE quotes", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// connection.connect(function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Connected to database')
//   var sql = "CREATE TABLE allquotes (name VARCHAR(255), location VARCHAR(255), date VARCHAR(255), category VARCHAR(255), message VARCHAR(255), allowed BOOLEAN)";
//   connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// })

app.get('/', function (req, res) { //handles get request
  res.render('index');
})

function getDate() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10)
  {
      dd='0'+dd;
    }

  if(mm<10)
  {
    mm='0'+mm;
  }

  return mm+'/'+dd+'/'+yyyy
}


app.post('/quotes', function(req, res) {
  console.log("clicked");

  let name = xss(req.body.name);
  let location = xss(req.body.location);
  let date = getDate();
  let category = xss(req.body.category);
  let message = xss(req.body.message);

  //replace quotation marks
  name = name.replace(/"/gi, "'");
  location = location.replace(/"/gi, "'");
  date = date.replace(/"/gi, "'");
  category = category.replace(/"/gi, "'");
  message = message.replace(/"/gi, "'");

  var sql = "INSERT INTO allquotes (name, location, date, category, message, allowed) VALUES ?";
  var data = [[name, location, date, category, message, false]];
  connection.query(sql, [data], function(error, results, fields) {
      if(error) {
        console.log(error)
        res.json({error: true, message: "There has been an error. Please try again."});
        res.end();
      } else {
        res.json({error: false, message: "The quote has been submitted! It will be reviewed and then added to the site."});
        res.end();
      }
  });
})

app.get('/quotes', function(req, res) {
  connection.query('SELECT * FROM allquotes', function(error, results, fields) {

      if(error) {
        console.log(error)
        return res.json({data: []});
      } else {
        data = [];
        for(var i = 0; i < results.length; i++) {
          if(results[i].allowed) {
            data.push({name: results[i].name, location: results[i].location, date: results[i].date, category: results[i].category, message: results[i].message})
          }
        }
        return res.json({data: data});
      }
  });
})


app.listen(PORT, function () {
  console.log('go to http://localhost:3000/')
})
