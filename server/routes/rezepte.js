const express = require("express");

const Rezept = require('../models/rezept');

const router = express.Router();

//Rezept SPEICHERN
router.post('/save', (req, res, next) => {
  console.log('Rezept speichern.');
  var query = {_id: req.body.id};
  if (!query._id) {
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
router.get('/list', (req, res, next) => {
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
router.get('/random', (req, res, next) => {
  console.log("Random Rezept laden.");
  Rezept.aggregate([{$sample: {size: 1}}])
    .then(rez => {
      console.log("rez: ", rez);
      res.status(200).json(rez[0]);
    })
    .catch((err) => {
      console.log('Error occured: ', err);
    });
});

//Rezept LADEN
router.get('/:id', (req, res, next) => {
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
router.delete('/delete/:id', (req, res, next) => {
  console.log('Einzelnes Rezept löschen.');
  Rezept.deleteOne({_id: req.params.id})
    .then(result => {
      console.log('result= ', result);
    })
    .catch((err) => {
      console.log('Error occured: ', err);
    });
});

module.exports = router;
