const express = require('express');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const passport = require('passport');
const { jobController } = require('../controllers');
const Job = mongoose.model('Job');
const Resume = mongoose.model('Resume');

const router = express.Router();

// GET /api/job?limit=10&page=1
router.get('/', jobController.getJobs);

// GET /api/job/:id
router.get('/:id', jobController.getJob);

// POST /api/job
router.post('/', passport.authenticate("jwt", { session: false }), jobController.createJob);

// DELETE /api/job/:id
router.delete('/:id', passport.authenticate("jwt", { session: false }), jobController.deleteJob);

// PUT /api/job/:id
router.put('/:id', passport.authenticate("jwt", { session: false }), jobController.updateJob);

// GET /api/job/search/:keyword
router.get('/search/:keyword', jobController.searchJob);

module.exports = router;