const express = require('express');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const passport = require('passport');
const { jobController } = require('../controllers');
const validate = require('../middlewares/validate.js');
const { jobValidator } = require('../validators');

const router = express.Router();

// GET /api/job?limit=10&page=1
router.get('/', validate(jobValidator.getJobs), jobController.getJobs);

// GET /api/job/:id
router.get('/:id', validate(jobValidator.getJob), jobController.getJob);

// POST /api/job
router.post('/', validate(jobValidator.createJob), passport.authenticate("jwt", { session: false }), jobController.createJob);

// DELETE /api/job/:id
router.delete('/:id', passport.authenticate("jwt", { session: false }), jobController.deleteJob);

// PUT /api/job/:id
router.put('/:id', passport.authenticate("jwt", { session: false }), jobController.updateJob);

// GET /api/job/search/:keyword
router.get('/search/:keyword', jobController.searchJob);

module.exports = router;