// Get dependencies
const express = require('express');
const path = require('path');
const assert = require('assert');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const app = express();
const dbName = 'rezepte';
const collectionName = 'rezept';
const rezeptUrl = '/api/rezept'
const ObjectID = mongodb.ObjectID;

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
mongodb.MongoClient.connect('mongodb://mike:_123mike@ds113435.mlab.com:13435/' + dbName, (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log('Express Server listening on localhost:3000')
  });
});


//////////////////
//API Definition//
//////////////////
//Alle Rezpte lesen
app.get(rezeptUrl + '/list', (req, res) => {
  db.collection(collectionName).find().toArray((err, result) => {
    if (err) {
      console.log('Failed to get List of Rezepte');
      res.status(500).send(err);
    } else {
      console.log("Alle Rezepte lesen aus DB, Result= ", result);
      res.status(200).send(result);
    }
  });
});

//Einzelnes Rezept lesen
app.get(rezeptUrl + '/:id', (req, res) => {
  console.log("IDDDD: " + req.params.id);
  db.collection(collectionName).findOne({_id: new ObjectID(req.params.id)}, (err, doc) => {
    console.log("doc: ", doc);
    if (err) {
      handleError(res, err.message, "Failed to get Rezept mit id: " + req.params.id);
    } else {
      console.log('Rezept erfolgreich geholt mit id: ' + res);
      res.status(200).json(doc);
    }
  });
});

//WRITE
app.post('/api/rezept/save', (req, res) => {
  db.collection(collectionName).insertOne(req.body, (err, result) => {
    // Auf Fehler prüfen
    if (err) return console.log(err);
    //ODER Logik prüfen, ob es geklappt hat
    assert.equal(null, err);
    assert.equal(1, result.insertedCount);

    console.log('saved to database');
    res.status(200);
    //res.redirect(rezeptUrl +'/');
  });
});


///////////////////////////////////////////////////////////////


//UPDATE
app.put('/api/rezept/quotes', (req, res) => {
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
app.delete('/api/rezept/quotes', (req, res) => {
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
  res.sendFile(path.join(__dirname, '../src/index.html'));
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
