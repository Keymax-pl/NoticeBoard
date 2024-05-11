const express = require('express');
const router = express.Router();
const ads = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.post('/ads', imageUpload.single('image'),authMiddleware, ads.addNewAd);
router.put('/ads/:id', imageUpload.single('image'),authMiddleware, ads.updateAd);
router.delete('/ads/:id', authMiddleware, ads.removeAd)

module.exports = router;