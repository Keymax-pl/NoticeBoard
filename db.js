const mongoose = require("mongoose");


const ConnectToDB = () => {
  mongoose.connect('mongodb://0.0.0.0:27017/adsDB', { useNewUrlParser: true });
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to the database');
  });
  db.on('error', err => console.log('Error ' + err));
};

module.exports = ConnectToDB;