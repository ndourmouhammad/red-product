const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/Hotel');
const upload = require('../config/multer');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, hotelController.getAllHotels);
router.post('/', authMiddleware, upload.single('image'), hotelController.addHotel);
router.put('/:id', authMiddleware, upload.single('image'), hotelController.updateHotel);
router.delete('/:id', authMiddleware, hotelController.deleteHotel);

module.exports = router;