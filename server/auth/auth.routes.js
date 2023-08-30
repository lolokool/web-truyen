const express = require('express');
const router = express.Router();

const authController = require('./auth.controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;