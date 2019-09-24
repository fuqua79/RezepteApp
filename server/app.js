const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Rezept = require('./models/rezept');

const app = express();
const rezeptUrl = '/api/rezept';
mongoose.set('useFindAndModify', false);

//test mit korrekter DB-Name austauschen
mongoose.connect('mongodb+srv://ssouser:YLiZYNFOro1JKF8s@cluster0-vqzry.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection to databse failed !')
  });
/*
MongoDB Account: fuqua

MongoDb Atlas
mmugglin@hotmail.com
fuqua
_123Mike

MongodDB Atlas Credentials
https://cloud.mongodb.com/v2/59515b3ec0c6e30371baa3a0#clusters/connect?clusterId=Cluster0
username: ssouser
password: YLiZYNFOro1JKF8s
 */




app.use(bodyParser.json());

//Header-Handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

//Methods
//Rezept SPEICHERN
app.post(rezeptUrl + '/save', (req, res, next) => {
  console.log('Rezept speichern.');
  var query = {_id: req.body.id};
  if(!query._id){
    query._id = new mongoose.mongo.ObjectID();
  }
  //if(req.body.id)
  Rezept.findOneAndUpdate(
    //Query, was updaten
    query,
    {
      $set: {
        beschreibung: req.body.beschreibung,
        titel: req.body.titel,
        zutatenAnzahl: req.body.zutatenAnzahl,
        zutaten: req.body.zutaten,
        naehrwerte: req.body.naehrwerte,
        schwierigkeitsgrad: req.body.schwierigkeitsgrad,
        zeit: req.body.zeit,
        zubereitung: req.body.zubereitung,
        art: req.body.art,
        imageFilename: req.body.imageFilename
      }
    },
    //options
    {
      sort: {_id: -1}, //neuster Eintrag suchen
      upsert: true //falls keine gefunden, dann einen neuen erstellen
    }
  )
    .then((result) => {
      console.log('result: ', result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log('Error occured: ', err);
    });
});


//ALLE Rezepte LADEN
app.get(rezeptUrl + '/list', (req, res, next) => {
  console.log('Alle Rezepte laden.');
  Rezept.find()
    .then(rezeptListe => {
    console.log('rezeptListe= ', rezeptListe);
    res.status(200).json(rezeptListe);
  })
    .catch((err) => {
      console.log('Error occured: ', err);
    })
});

//Random Rezept lesen
app.get(rezeptUrl + '/random', (req, res, next) => {
  console.log("Random Rezept laden.");
  Rezept.aggregate([{$sample: {size: 1}}])
    .then(rez => {
      console.log("rez: ", rez);
      res.status(200).json(rez);
    })
    .catch((err) => {
      console.log('Error occured: ', err);
    });
});

//Rezept LADEN
app.get(rezeptUrl + '/:id', (req, res, next) => {
  console.log('Einzelnes Rezept laden.');
  Rezept.findById(req.params.id)
    .then(rez => {
    console.log("rez: ", rez);
    res.status(200).json(rez);
  })
    .catch((err) => {
      console.log('Error occured: ', err);
    });
});

//Rezept LOESCHEN
app.delete(rezeptUrl + '/delete/:id', (req, res, next) => {
  console.log('Einzelnes Rezept löschen.');
  Rezept.deleteOne({_id: req.params.id})
    .then( result => {
      console.log('result= ', result);
    })
    .catch((err) => {
      console.log('Error occured: ', err);
    });
});



module.exports = app;
