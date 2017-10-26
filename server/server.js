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
//CONNECTION
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
      console.log("Alle Rezepte erfolgreich geholt, Result= ", result);
      res.status(200).send(result);
    }
  });
});

//Einzelnes Rezept lesen
app.get(rezeptUrl + '/:id', (req, res) => {
  console.log("Rezpet mit Id: " + req.params.id + " lesen.");
  db.collection(collectionName).findOne({_id: new ObjectID(req.params.id)}, (err, doc) => {
    if (err) {
      console.log('Failed to get one Rezept');
      handleError(res, err.message, "Failed to get Rezept mit id: " + req.params.id);
    } else {
      console.log('Rezept erfolgreich geholt, Result= ', doc);
      res.status(200).json(doc);
    }
  });
});

//Random Rezept lesen
app.get(rezeptUrl + '/random/mike', (req, res) => {
  console.log("Random Rezpet lesen.");
  db.collection(collectionName).aggregate([{$sample: {size: 1}}], (err, doc) => {
    if (err) {
      console.log('Failed to get one Rezept');
      handleError(res, err.message, "Failed to get Rezept mit id: " + req.params.id);
    } else {
      console.log('Rezept erfolgreich geholt, Result= ', doc[0]);
      res.status(200).json(doc[0]);
    }
  });
});

//Rezept speichern (INSERT oder UPDATE)
app.post(rezeptUrl + '/save', (req, res) => {
  //Hier wird gemerkt, ob ich ein Insert oder Update machen muss !!!
  console.log("Speichern, _id = ", req.body._id);
  console.log("Speichern, body= ", req.body);
  console.log("objectID= ", new ObjectID(req.body._id));

  //UPSERT
  db.collection(collectionName).findOneAndUpdate(
    //Query, was updaten
    {_id: new ObjectID(req.body._id)},
    //updaten wie
    {
      $set: {
        beschreibung: req.body.beschreibung,
        titel: req.body.titel,
        zutatenAnzahl: req.body.zutatenAnzahl,
        zutaten: req.body.zutaten,
        kalorien: req.body.kalorien,
        schwierigkeitsgrad: req.body.schwierigkeitsgrad,
        zeit: req.body.zeit,
        zubereitung: req.body.zubereitung,
        art: req.body.art,
        bildsrc: req.body.bildsrc,
        url: req.body.url
      }
    },
    //options
    {
      sort: {_id: -1}, //neuster Eintrag suchen
      upsert: true //falls keine gefunden, dann einen neuen erstellen
    },
    //callback => result wieder zurücksenden
    (err, result) => {
      if (err) {
        console.log("ERROR !!!!!");
        return res.send(err);
      }
      console.log("ERFOLG !!!!!");
      res.send(result)
    })
});

//Rezept loeschen
app.delete(rezeptUrl + '/delete/:id', (req, res) => {
  db.collection(collectionName).findOneAndDelete(
    //query, was löschen
    {_id: new ObjectID(req.params.id)},
    (err, result) => {
      if (err) {
        return res.send(500, err);
      }
      res.send('result');
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
