const express = require('express');
const router = express.Router();
const ads = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');

router.get('/ads', ads.getAll);
router.get('/ads/:id', ads.getById);
router.post('/ads', authMiddleware, ads.addNewAd);
router.put('/ads/:id', authMiddleware, ads.updateAd);
router.delete('/ads/:id', authMiddleware, ads.removeAd)

module.exports = router;