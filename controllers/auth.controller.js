const User = require('../models/User.model')
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const Session = require("../models/Session.model");
const fs = require("fs");

exports.register = async (req, res) => {
  try {
    const { login, password, phoneNumber } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (login && typeof login === 'string' && password && typeof password === 'string' && phoneNumber && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      const userWithLogin = await User.findOne({ login});

      if (userWithLogin) {
        fs.unlinkSync(`public/uploads/${req.file.filename}`)
        return res.status(409).send({ message: 'User with this login already exists' })
      }

      const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename });
      res.status(200).send({ message: 'User created successfully' + ' ' + user.login });

    } else {
      res.status(400).send({ message: 'Bad request' })
    }
  }
  catch (err) {
    res.status(500).send({ message: err });
  };

};

exports.login = async (req, res) => {
  try {
    const {login, password} = req.body;

    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });

      if (!user) {
       res.status(400).send({ message:'Login or password is incorrect'});
      }
      else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = { login: user.login, id: user._id };
          res.status(200).send({ message: 'Login successful' });
        }
        else {
          res.status(400).send({ message:'Login or password is incorrect'});
        }
      }

    }

  }
  catch (err) {
    res.status(500).send({ message: err });
  };
};

exports.getUser = async (req, res) => {
  res.send(' Yeah! I\'m logged')
};