const express = require('express');

const app = express();
/*
app.use((req, res, next) => {
  console.log("first middleware");
  next(); //=> next muss aufgerufen werden, da sonst nicht weitergegangen wird: use ist middleware das einfach nacheinander aufegrufen wird, d.h. nach dem next() ;-)
});
*/

app.use('/api/test', (req, res, next) => {
  const rezepte = [
    {
      id: '124234kf4',
      title: 'Titel erster post'
    },
    {
      id: '84jhit',
      title: 'Titel zweiter post'
    }
  ];
  res.status(200).json({
    message: 'Post fethced successfully',
    posts: rezepte
  });
  next();
});

app.use('/api/rezept/random', (req, res, next) => {
  const rezept = {
    id: '892h34tui',
    beschreibung: 'beschreibung_mike',
    titel: 'titel_mike',
    zutatenAnzahl: 0,
    zutaten: [],
    schwierigkeitsgrad: '',
    zeit: 0,
    zubereitung: '',
    art: '',
    selected: false,
    imageFilename: '',
    naehrwerte: null
  };
  res.status(200).json(rezept);
  next();
});


module.exports = app;
