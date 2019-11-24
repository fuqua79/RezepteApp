const Rezept = require('../models/rezept');
const Art = require('../models/art');

exports.insertRezept = (req, res, next) => {
  console.log('Rezept inserten.');
  const rezept = new Rezept({
    beschreibung: req.body.beschreibung,
    titel: req.body.titel,
    anzahlPersonen: req.body.anzahlPersonen,
    zutaten: req.body.zutaten,
    zeit: req.body.zeit,
    aktiveZeit: req.body.aktiveZeit,
    zubereitung: req.body.zubereitung,
    art: req.body.art,
    naehrwerte: req.body.naehrwerte,
    imagePath: req.body.imagePath,
    creator: req.userData.userId
  });
  rezept.save()
    .then((result) => {
      //zuerst suchen, ob Art bereits in DB vorhanden => unique !
      if (req.body.art) {
        Art.findOne({art: req.body.art}, (err, art) => {
          if (err) {
            res.status(500).json();
          }
          console.log('art: ', art);
          if (art) {
            res.status(200).json(result);
          } else {
            // art separat in DB speichern !
            const art = new Art({art: req.body.art});
            art.save()
              .then(() => {
                res.status(201).json(result);
              })
          }
        });
      } else {
        res.status(201).json(result);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a rezept failed!"
      });
    });
};

exports.updateRezept = (req, res, next) => {
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
        zeit: req.body.zeit,
        aktiveZeit: req.body.aktiveZeit,
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
      if (result.n > 0) {
        //zuerst suchen, ob Art bereits in DB vorhanden => unique !
        if (req.body.art) {
          Art.findOne({art: req.body.art}, (err, art) => {
            if (err) {
              res.status(500).json();
            }
            if (art) {
              res.status(200).json(result);
            } else {
              // art separat in DB speichern !
              const art = new Art({art: req.body.art});
              art.save()
                .then(() => {
                  res.status(201).json(result);
                })
            }
          });
        } else {
          res.status(201).json(result);
        }
      } else {
        res.status(401).json("User not authorized to update this rezept, id: " + req.params.id);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Updating a rezept failed!"
      });
    });
};

exports.getAllRezepte = (req, res, next) => {
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
};

exports.getRandomRezept = (req, res, next) => {
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
};

exports.getRezept = (req, res, next) => {
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
};

exports.findRezept = (req, res, next) => {
  let query = {};
  if (req.query.text) {
    query = {...query, $text: {$search: req.query.text}};
  }
  if (req.query.zeit) {
    query = {...query, "zeit": {$gte: req.query.zeit}};
  }
  if (req.query.art) {
    query = {...query, "art": req.query.art};
  }
  Rezept.find(query)
    .then(rezeptListe => {
      res.status(200).json(rezeptListe);
    })
    .catch(error => {
      res.status(500).json({
        message: "Search Rezept failed!"
      });
    });
};


exports.deleteRezept = (req, res, next) => {
  console.log('Einzelnes Rezept löschen.');
  let rezeptArt;
  Rezept.findById(req.params.id)
    .then(rezept => {
      if (rezept && rezept.art) {
        rezeptArt = rezept.art;
      }
      Rezept.deleteOne({_id: req.params.id, creator: req.userData.userId})
        .then(result => {
          if (result.n > 0) {
            res.status(200).json();
            if (rezeptArt) {
              // Jetzt noch prüfen, ob art letzter seiner Art war. Wenn ja, dann auch aus options löschen
              const query = {"art": rezeptArt};
              Rezept.find(query)
                .then(rezeptliste => {
                  //Wenn letzte Art dann löschen
                  if (rezeptliste.length === 0) {
                    //es hat kein Rezept mehr mit dieser Art => Art aus Art löschen
                    Art.deleteOne({art: rezeptArt})
                      .then(() => {
                      })
                  }
                })
                .catch(error => {
                  res.status(500).json({
                    message: "Finding OptionArt failed!"
                  });
                })
            } else {
              // rezeptArt leer
              res.status(200).json();
            }
          } else {
            res.status(401).json("User not authorized to delete this rezept, id: " + req.params.id);
          }
        })
        .catch(error => {
          res.status(500).json({
            message: "Deleting a rezept failed!"
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting a rezept failed!"
      });
    });
};
