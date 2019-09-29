const express = require("express");
const multer = require('multer');

const Rezept = require('../models/rezept');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};


// Helper-Logik zum File speichern
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
  checkAuth,
  multer({storage: storage}).single("image"),
  (req, res, next) => {
    // url
    const url = req.protocol + "://" + req.get("host");
    res.status(201).json({
      'imagePath': url + '/images/' + req.file.filename
    });
  }
);


//Rezept INSERTEN
router.post(
  '/save',
  checkAuth,
  (req, res, next) => {
    console.log('Rezept inserten.');
    const rezept = new Rezept({
      beschreibung: req.body.beschreibung,
      titel: req.body.titel,
      anzahlPersonen: req.body.anzahlPersonen,
      zutaten: req.body.zutaten,
      schwierigkeitsgrad: req.body.schwierigkeitsgrad,
      zeit: req.body.zeit,
      zubereitung: req.body.zubereitung,
      art: req.body.art,
      naehrwerte: req.body.naehrwerte,
      imagePath: req.body.imagePath,
      creator: req.userData.userId
    });
    rezept.save()
      .then((result) => {
        console.log('INSERT result: ', result);
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
  }
);


//Rezept UPDATEN
router.put(
  '/:id',
  checkAuth,
  (req, res, next) => {
    console.log('Rezept updaten, id: ' + req.params.id);
    Rezept.updateOne(
      // filter
      {_id: req.params.id, creator: req.userData.userId},
      // data
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
          imagePath: req.body.imagePath,
          creator: req.userData.userId
        }
      },
      // options
      {
        sort: {_id: -1}, //neuster Eintrag suchen
        upsert: true //falls keine gefunden, dann einen neuen erstellen
      }
    )
      .then((result) => {
        console.log('SAVE result: ', result);
        if (result.nModified > 0) {
          res.status(200).json(result);
        } else {
          res.status(401).json("User not authorized to update this rezept, id: " + req.params.id);
        }
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
  });


//ALLE Rezepte LADEN
router.get(
  '/list',
  (req, res, next) => {
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
router.get(
  '/random',
  (req, res, next) => {
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
router.get(
  '/:id',
  (req, res, next) => {
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
router.delete(
  '/delete/:id',
  checkAuth,
  (req, res, next) => {
    console.log('Einzelnes Rezept löschen.');
    Rezept.deleteOne({_id: req.params.id,  creator: req.userData.userId})
      .then(result => {
        console.log('result= ', result);
        if(result.n > 0) {
          res.status(200).json(result);
        } else {
          res.status(401).json("User not authorized to delete this rezept, id: " + req.params.id);
        }
      })
      .catch((err) => {
        console.log('Error occured: ', err);
      });
  });

module.exports = router;
