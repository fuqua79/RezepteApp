const express = require("express");
const mongoose = require('mongoose');
const multer = require('multer');

const Rezept = require('../models/rezept');

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "server/assets/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});


//FILE speichern
router.post(
  '/file/save',
  multer({storage: storage}).single("image"),
  (req, res, next) => {
    // url
    const url = req.protocol + "://" + req.get("host");
    res.status(201).json({
      'imagePath': url + '/images/' + req.file.filename
    });
  }
);

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
        anzahlPersonen: req.body.anzahlPersonen,
        zutaten: req.body.zutaten,
        naehrwerte: req.body.naehrwerte,
        schwierigkeitsgrad: req.body.schwierigkeitsgrad,
        zeit: req.body.zeit,
        zubereitung: req.body.zubereitung,
        art: req.body.art,
        imagePath: req.body.imagePath
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
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log('Error occured: ', err);
    });
});

module.exports = router;
