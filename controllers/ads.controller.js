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
      let { title, text, date, price, location, user } = req.body;
      const fileType = req.file ? await getImageFileType(req.file) : "unknown";
  
      const ad = await Advert.findById(req.params.id);
      if (!ad) {
        return res.status(404).send({ message: "Not found" });
      }
  
      if (title && text && date && price && location && user) {
        if (
          !(title.length >= 10 && title.length <= 50) ||
          !(text.length >= 20 && text.length <= 1000)
        ) {
          if (req.file) {
            fs.unlinkSync(`public/uploads/${req.file.filename}`);
          }
          return res.status(400).send({ message: "Wrong input!" });
        }
  
        ad.title = title;
        ad.text = text;
        ad.date = date;
        ad.price = price;
        ad.location = location;
        ad.user = user;
  
        if (
          req.file &&
          ["image/png", "image/jpeg", "image/gif"].includes(fileType)
        ) {
          if (adv.img) {
            fs.unlinkSync(`public/uploads/${adv.img}`);
          }
          adv.img = req.file.filename;
        }
  
        await adv.save();
        return res.status(200).send({ message: "OK", adv });
      } else {
        return res.status(400).send({ message: "Missing fields" });
      }
    } catch (err) {
      return res.status(500).send({ message: err });
    }
}



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

  exports.searchAd = async (req, res) => {
    try {
      const ad = await Ad.find({ title: { $regex: req.params.searchPhrase, $options: 'i' } });
  
      if (ad.length === 0) {
        return res.status(404).send({ message: "Not found" });
      }
  
      res.json(ad);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };
  