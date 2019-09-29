const express = require("express");
const multer = require('multer');

const RezeptController = require('../controllers/rezepte');
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
router.post('/file/save', checkAuth, multer({storage: storage}).single("image"), RezeptController.saveFile);

//Rezept INSERTEN
router.post('/save', checkAuth, RezeptController.insertRezept);

//Rezept UPDATEN
router.put('/:id', checkAuth, RezeptController.updateRezept);

//ALLE Rezepte LADEN
router.get('/list', RezeptController.getAllRezepte);

//Random Rezept lesen
router.get('/random', RezeptController.getRandomRezept);

//Rezept LADEN
router.get('/:id', RezeptController.getRezept);

//Rezept LOESCHEN
router.delete('/delete/:id', checkAuth, RezeptController.deleteRezept);

module.exports = router;
