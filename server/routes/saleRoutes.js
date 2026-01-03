const express = require('express');
const router = express.Router();
const { createSale, getMonthlyStats } = require('../controllers/saleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, createSale);
router.get('/stats', protect, admin, getMonthlyStats);

module.exports = router;
