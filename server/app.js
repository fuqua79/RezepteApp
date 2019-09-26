const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const rezepteRoutes = require("./routes/rezepte");

const app = express();

mongoose.set('useFindAndModify', false);

// TODO: test mit korrekter DB-Name austauschen
mongoose.connect('mongodb+srv://ssouser:YLiZYNFOro1JKF8s@cluster0-vqzry.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection to databse failed !')
  });
/*
MongoDB Account: fuqua

MongoDb Atlas
mmugglin@hotmail.com
fuqua
_123Mike

MongodDB Atlas Credentials
https://cloud.mongodb.com/v2/59515b3ec0c6e30371baa3a0#clusters/connect?clusterId=Cluster0
username: ssouser
password: YLiZYNFOro1JKF8s
 */




app.use(bodyParser.json());

//Header-Handling
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use("/api/rezept", rezepteRoutes);

module.exports = app;
