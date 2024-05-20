const Ad = require('../models/Ad.model');
const getImageFileType = require("../utils/getImageFileType");
const fs = require("fs");

exports.getAll = async (req, res) => {
  try {
    res.json(await Ad.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Not Found' });
    }
    res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addNewAd = async (req, res) => {
  try {
    const { title, text, price, location, date } = req.body;
    const user = req.session.user;
    const fileType = req.file ? await getImageFileType(req.file) : "unknown";

    if (!title || !text || !price || !location || !user) {
      if (req.file) fs.unlinkSync(`public/uploads/${req.file.filename}`);
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    if (
      title &&
      text &&
      date &&
      price &&
      location &&
      user &&
      req.file && ["image/png", "image/jpeg", "image/gif"].includes(fileType)
    ) {
      const newAd = new Ad({
        title,
        text,
        date,
        image: req.file.filename,
        price,
        location,
        user: req.session.user.id
      });

      await newAd.save();
      res.json({ message: 'Ad added successfully ' });
    } else {
      if (req.file) fs.unlinkSync(`public/uploads/${req.file.filename}`);
      res.status(400).json({ message: 'Invalid input or missing fields' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const updatedAd = await Ad.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        text: req.body.text,
        price: req.body.price,
        location: req.body.location,

        ...(req.file && { image: req.file.filename }),
      },
      { new: true }
    );

    if (req.file) {
      fs.unlinkSync(`./public/uploads/${updatedAd.image}`);
    }

    res.json(updatedAd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},

exports.removeAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      if (ad.image) {
        fs.unlinkSync(`public/uploads/${ad.image}`);
      }
      await Ad.deleteOne({ _id: req.params.id });
      res.json(ad);
    } else {
      res.status(404).json({ message: 'Ad not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchAd = async (req, res) => {
  try {
    const ads = await Ad.find({ title: { $regex: req.params.searchPhrase, $options: 'i' } });

    if (ads.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(ads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
