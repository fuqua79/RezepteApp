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
        res.status(201).json(result);
      })
      .catch(error => {
        res.status(500).json({
          message: "Creating a rezept failed!"
        });
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
        if (result.nModified > 0) {
          res.status(200).json(result);
        } else {
          res.status(401).json("User not authorized to update this rezept, id: " + req.params.id);
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Updating a rezept failed!"
        });
      });
  });


//ALLE Rezepte LADEN
router.get(
  '/list',
  (req, res, next) => {
    console.log('Alle Rezepte laden.');
    Rezept.find()
      .then(rezeptListe => {
        res.status(200).json(rezeptListe);
      })
      .catch(error => {
        res.status(500).json({
          message: "Get all Rezepte failed!"
        });
      });
  });

//Random Rezept lesen
router.get(
  '/random',
  (req, res, next) => {
    console.log("Random Rezept laden.");
    Rezept.aggregate([{$sample: {size: 1}}])
      .then(rez => {
        res.status(200).json(rez[0]);
      })
      .catch(error => {
        res.status(500).json({
          message: "Get random rezept failed!"
        });
      });
  });

//Rezept LADEN
router.get(
  '/:id',
  (req, res, next) => {
    console.log('Einzelnes Rezept laden.');
    Rezept.findById(req.params.id)
      .then(rez => {
        res.status(200).json(rez);
      })
      .catch(error => {
        res.status(500).json({
          message: "Get specified rezept failed!"
        });
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
        if(result.n > 0) {
          res.status(200).json(result);
        } else {
          res.status(401).json("User not authorized to delete this rezept, id: " + req.params.id);
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Deleting a rezept failed!"
        });
      });
  });

module.exports = router;
