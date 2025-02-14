const express = require('express');
const router = express.Router();
const authController = require('../controllers/User');

router.post('/signup', authController.signup);
router.get("/verify/:userId/:uniqueString", authController.verifyUser);
router.get("/verified", authController.verifiedPage);
router.post('/signin', authController.signin);

module.exports = router;