const mongoose = require('mongoose');

const rezeptSchema = mongoose.Schema({
  beschreibung: { type: String, required: true},
  titel: { type: String, required: true },
  anzahlPersonen: {type: Number},
  zutaten: { type: [{menge: Number, einheit: String, zutat: String}]},
  schwierigkeitsgrad: {type: String},
  zeit: {type: Number},
  zubereitung: {type: String},
  art: {type: String},
  naehrwerte: {type: {kalorien: Number, fett: Number, eiweis: Number, kohlenhydrate: Number}},
  imagePath: {type: String}
});

module.exports = mongoose.model('Rezept', rezeptSchema);
