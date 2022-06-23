const express = require('express');
const passport = require('passport');
const { resumeController } = require('../controllers');
const { resumeValidator } = require('../validators');
const validate = require('../middlewares/validate.js');

const router = express.Router();

// POST /api/resume
router.post('/', validate(resumeValidator.submitResume), resumeController.submitResume);

// GET /api/resume/:job
router.get('/:job', validate(resumeValidator.getResumes), passport.authenticate("jwt", { session: false }), resumeController.getResumes);

module.exports = router;