const mongoose = require('mongoose');

const rezeptSchema = mongoose.Schema({
  beschreibung: {type: String, required: true},
  titel: {type: String, required: true},
  anzahlPersonen: {type: Number},
  zutaten: {type: [{menge: Number, einheit: String, zutat: String}]},
  zeit: {type: Number},
  aktiveZeit: {type: Number},
  zubereitung: {type: String},
  art: {type: String},
  naehrwerte: {type: {kalorien: Number, fett: Number, eiweis: Number, kohlenhydrate: Number}},
  imagePath: {type: String},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Rezept', rezeptSchema);
