const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running!');
});