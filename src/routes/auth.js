const express = require('express');
const mongoose = require('mongoose');
const Employer = mongoose.model('Employer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { authValidator } = require('../validators');
const validate = require('../middlewares/validate.js');
const { authController } = require('../controllers');
const router = express.Router();

// POST /api/auth/register
router.post('/register', validate(authValidator.register), authController.register);

// POST /api/auth/login
router.post('/login', validate(authValidator.login), authController.login);

module.exports = router;