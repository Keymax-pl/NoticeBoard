const Ad = require('../models/Ad.model')
const getImageFileType = require("../utils/getImageFileType");
const fs = require("fs");

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find())
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) res.status(404).json({ message: 'Not Found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};
exports.addNewAd = async (req, res) => {
  try {
    const { title, text, price, location, user, date } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";

    if (!title || !text || !price || !location || !user) {
      fs.unlinkSync(`public/uploads/${req.file.filename}`);
      return res.status(400).json({ message: 'Required fields are missing' });
    }
    if (
      title &&
      text &&
      date &&
      price &&
      location &&
      user &&
      req.file && ["image/png", "image/jpeg", "image/gif"].includes(fileType)) {

    const newAd = new Ad({
      title: title,
      text: text,
      date: date,
      image: req.file.filename,
      price: price,
      location: location,
      user: user
    });

    await newAd.save();
    res.json({ message: 'Ad added successfully ' });
  }
  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const { title, text, date, price, location, user } = req.body;
    if (!title || !text || !price || !location || !user) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'The ad was not found' });
    }
    if (ad.user !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to edit this ad' });
    }

    ad.title = title;
    ad.text = text;
    ad.price = price;
    ad.date = date;
    ad.location = location;
    ad.user = user;
    if (req.file && ["image/png", "image/jpeg", "image/gif"].includes(fileType)) {
      if (ad.img) {
        fs.unlinkSync(`public/uploads/${ad.img}`);
      }
      ad.img = req.file.filename;
    }
    await ad.save();

    res.json({ message: 'The ad has been updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


  exports.removeAd = async (req, res) => {
    try{
      const ad = await Ad.findById(req.params.id)
      if (ad) {
        await Ad.deleteOne({ _id: req.params.id });
        res.json(ad);
      }
      else res.status(404).json({ message: 'ad not found' });
    }
    catch (err) {
      res.status(500).json({ message: err })
    }
  };