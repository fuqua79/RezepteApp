// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
//const http = require('http');
//db= rezepte
//ds113435/rezepte
//user: fuqua
//password= _1234abcd
//URL: https://mlab.com/databases/rezepte#collections

//Db-user: mike
//DB-password: _123mike
//mongo shell: mongo ds113435.mlab.com:13435/rezepte -u <dbuser> -p <dbpassword>
//mongoDB Driver: mongodb://mike:_123mike@ds113435.mlab.com:13435/rezepte


var db;
MongoClient.connect('mongodb://mike:_123mike@ds113435.mlab.com:13435/rezepte', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('Express Server listening on localhost:3000')
  });
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'public')));

//API Definition
app.get('/get', (req, res) => {
  //res.send("GET HOLEN!!");
  var cursor = db.collection('rezept').find().toArray((err, results) => {
    console.log("AAAA", results);
  });
  console.log("jdjdj", cursor);
  res.send("GET HOLEN!!");
});

app.get('/post', (req, res) => {
    db.collection('rezept').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  });
});


// Catch all other routes and return the index file
app.get('*', (req, res) => {
    console.log("STARTSEITE");
    res.sendFile(path.join(__dirname, 'dist/index.html'));
    //res.sendFile(__dirname + '/dist/index.html');
    //res.send("Startseite index.html senden");
});




/**
 * Get port from environment and store in Express.
 */
/*
const port = process.env.PORT || '3000';
app.set('port', port);
*/
/**
 * Create HTTP server.
 */
/*
const server = http.createServer(app);
*/
/**
 * Listen on provided port, on all network interfaces.
 */
/*
server.listen(port, () => console.log(`API running on localhost:${port}`));
*/
