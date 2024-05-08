const Ad = require('../models/Ad.model')
const getImageFileType = require("../utils/getImageFileType");

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
    const {title, text, date, image, price, location, user} =req.body;

    const newAd = new Ad({
      title: title,
      text: text,
      date: date,
      image: image,
      price: price,
      location: location,
      user: user
    });
    await newAd.save(
      res.json({ message: 'ok' })
    )
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateAd = async (req, res) => {
    try{
      const {title, text, date, image, price, location, user} =req.body;
      const ad = await Ad.findById(req.params.id)
      if (ad) {
        ad.title = title;
        ad.text = text;
        ad.price = price;
        ad.date = date;
        ad.location = location;
        ad.image = image;
        ad.user = user;
        await ad.save();
      }
      else res.status(404).json({ message: 'ad not found' });
    }
    catch (err) {
      res.status(500).json({ message: err })
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