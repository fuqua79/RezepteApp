const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const rezepteRoutes = require("./routes/rezepte");
const userRoutes = require("./routes/user");

const app = express();

mongoose.set('useFindAndModify', false);

// TODO: test mit korrekter DB-Name austauschen
// mongoose.connect('mongodb+srv://ssouser:YLiZYNFOro1JKF8s@cluster0-vqzry.mongodb.net/test?w=majority', {useNewUrlParser: true})
mongoose.connect('mongodb+srv://ssouser:YLiZYNFOro1JKF8s@cluster0-vqzry.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection to databse failed !')
  });

app.use(bodyParser.json());
app.use("/images", express.static(path.join('server/assets/images')));

//Header-Handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use("/api/rezept", rezepteRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
