const express = require("express");

const RezeptController = require('../controllers/rezepte');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

//Rezept INSERTEN
router.post('/save', checkAuth, RezeptController.insertRezept);

//Rezept UPDATEN
router.put('/:id', checkAuth, RezeptController.updateRezept);

//ALLE Rezepte LADEN
router.get('/list', RezeptController.getAllRezepte);

//Random Rezept laden
router.get('/random', RezeptController.getRandomRezept);

//Einzelnes Rezept LADEN
router.get('/:id', RezeptController.getRezept);

//Rezept LOESCHEN
router.delete('/delete/:id', checkAuth, RezeptController.deleteRezept);

module.exports = router;
