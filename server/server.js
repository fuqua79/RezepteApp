// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const dbName = 'rezepte';
const collectionName = 'rezept';

//dbName= rezepte
//ds113435/rezepte
//URL: https://mlab.com/databases/rezepte#collections
//account-user: fuqua
//DB-user: mike
//DB-password: _123mike
//mongo shell: mongo ds113435.mlab.com:13435/rezepte -u <dbuser> -p <dbpassword>
//mongoDB Driver: mongodb://mike:_123mike@ds113435.mlab.com:13435/rezepte


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist, public-Ordner global zur Verfügung stellen
app.use(express.static(path.join(__dirname, 'public')));


//MongoDB by amazon mLab verbinden & Server starten
var db;
MongoClient.connect('mongodb://mike:_123mike@ds113435.mlab.com:13435/' + dbName, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('Express Server listening on localhost:3000')
  });
});


//////////////////
//API Definition//
//////////////////
//READ
app.get('/api/get', (req, res) => {
  //res.send("GET HOLEN!!");
  var cursor = db.collection(collectionName).find().toArray((err, results) => {
    console.log("AAAA", results);
  });
  console.log("jdjdj", cursor);
  res.send("GET HOLEN!!");
});

//Einzelner Lesen
app.get("/api/get/:id", (req, res) => {
  db.collection(collectionName).findOne({_id: new ObjectID(req.params.id)}, (err, doc) => {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});


//WRITE
app.get('/api/post', (req, res) => {
  db.collection(collectionName).insertOne(req.body, (err, result) => {
    // Auf Fehler prüfen
    if (err) return console.log(err);
    //ODER Logik prüfen, ob es geklappt hat
    assert.equal(null, err);
    assert.equal(1, result.insertedCount);

    console.log('saved to database');
    res.redirect('/');
  });
});

//UPDATE
app.put('/api/quotes', (req, res) => {
  db.collection(collectionName)
    .findOneAndUpdate(
      //Query, was updaten
      {name: 'Yoda'},
      //wie updaten
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      //options
      {
        sort: {_id: -1}, //neuster Eintrag suchen
        upsert: true //falls keine gefunden, dann einen neuen erstellen
      },
      //callback => result wieder zurücksenden
      (err, result) => {
        if (err) return res.send(err);
        res.send(result)
      })
});


//DELETE
app.delete('/api/quotes', (req, res) => {
  db.collection(collectionName).findOneAndDelete(
    //query, was löschen
    {name: req.body.name},
    //callback => zurücksenden, ob es funktioniert hat
    (err, result) => {
      if (err) return res.send(500, err);
      res.send('A darth vadar quote got deleted');
    })
});


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  console.log("STARTSEITE");
  res.sendFile(path.join(__dirname, 'dist/index.html'));
  //res.sendFile(__dirname + '/dist/index.html');
  //res.send("Startseite index.html senden");
});


//Hilsfunktionen
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*
// => USE:
// if (err) {
handleError(res, err.message, "Failed to get contacts.");
} else {
  res.status(200).json(docs);
}
*/
