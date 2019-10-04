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

//Rezept SUCHEN
router.get('/search', RezeptController.findRezept);

//Einzelnes Rezept LADEN
router.get('/:id', RezeptController.getRezept);
// http://localhost:3000/api/rezept/search?name=Mike&age=30



//Rezept LOESCHEN
router.delete('/delete/:id', checkAuth, RezeptController.deleteRezept);

module.exports = router;
