// Get dependencies
const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var fs = require('fs');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var db;
const app = express();
const dbName = 'rezepte';
const collectionName = 'rezept';
const collectionNameImages = 'rezeptImages';
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
//Web-Server starten
app.listen(3000, () => {
  console.log('V2 Express Server listening on localhost:3000')
});


//CONNECTION
var promise = mongoose.connect('mongodb://mike:_123mike@ds113435.mlab.com:13435/' + dbName, {
  useMongoClient: true,
});



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('We are connected !!!')
});

var schema = new Schema({
  img: {data: Buffer, contentType: String}
});

var A = mongoose.model('rezeptImage', schema);


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
      res.status(500).send(err);
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
      res.status(500).send(err);
    } else {
      console.log('Rezept erfolgreich geholt, Result= ', doc[0]);
      res.status(200).json(doc[0]);
    }
  });
});

//Rezept speichern (INSERT oder UPDATE)
app.post(rezeptUrl + '/save', (req, res) => {
  console.log("Rezept upsert mit objectID= ", new ObjectID(req.body._id));

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
        return res.status(500).send(err);
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
        return res.status(500).send(err);
      }
      res.send('result');
    })
});


//Image speichern !
//Rezept speichern (INSERT oder UPDATE)
app.post(rezeptUrl + '/image/save', (req, res) => {
  console.log("Image speichern mit objectID= ", new ObjectID(req.body._id));

  console.log('req: ', req);
  var imgPath = './src/assets/images/Risotto_Safran.jpg';

  var a = new A;
  a.img.data = fs.readFileSync(imgPath);

  a.img.contentType = 'image/png';
  console.log('jbhbjhjhb');
  a.save(function (err, a) {
    if (err) throw err;
    console.error('saved img to mongo, a:', a);
  });
});


//Einzelnes Rezept lesen
app.get(rezeptUrl + '/image/:id', (req, res) => {
  console.log("Image mit Id: " + req.params.id + " lesen.");

  var a = new A;

  A.findById(a, function (err, doc) {
    if (err) return next(err);
    console.log('doc: ', doc);
    res.contentType(doc.img.contentType);
    res.send(doc.img.data);
  });
});


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  console.log("STARTSEITE");
  res.sendFile(path.join(__dirname, '../src/index.html'));
//TODO:
  //res.sendFile(__dirname + '/dist/index.html');
});
