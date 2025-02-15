const express = require('express');
const router = express.Router();
const authController = require('../controllers/User');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);
router.get("/verify/:userId/:uniqueString", authController.verifyUser);
router.get("/verified", authController.verifiedPage);
router.post('/signin', authController.signin);
router.post('/reset-password', authController.resetPassword);
router.get('/reset-password/:userId/:uniqueString', authController.verifyResetPasswordLink);
router.post('/update-password', authController.updatePassword);
router.get('/logout', authMiddleware, authController.logout);

module.exports = router;