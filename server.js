const express = require('express');
const path = require('path');
const cors = require('cors');
const connectToDB = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose');

// start express server
const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running...");
});

// connect to DB
connectToDB();

// add middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:8000"],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'xyz2134', store: MongoStore.create(mongoose.connection), resave: false, saveUninitialized: false }));

// serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

// add routes
app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

// at any other Link
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found :(' })
})