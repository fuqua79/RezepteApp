const Art = require('../models/art');

exports.getOptionsArt = (req, res, next) => {
  console.log('Options für Art holen.');
  Art.find()
    .then(optionsArtListe => {
      res.status(200).json(optionsArtListe);
    })
    .catch(error => {
      res.status(500).json({
        message: "Get options for Art failed!"
      });
    });
};
