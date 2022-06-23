const express = require('express');
const mongoose = require('mongoose');
const { storage } = require('../config/firebase');
const { ref, uploadString, getDownloadURL } = require('firebase/storage');
const httpStatus = require('http-status');
const passport = require('passport');
const { resumeController } = require('../controllers');
const Resume = mongoose.model('Resume');

const router = express.Router();

// POST /api/resume
router.post('/', resumeController.submitResume);

router.post('/', (req, res) => {
    // extract file from request
    const file = req.body.resume;
    // name the file
    const storageRef = ref(storage, `${Date.now()}.pdf`);
    const metadata = {
        contentType: 'application/pdf',
    };
    // upload file
    uploadString(storageRef, file, 'base64', metadata).then(async (snapshot) => {
        // get download url
        const downloadURL = await getDownloadURL(snapshot.ref);
        // create resume
        const resume = new Resume({
            resumeUrl: downloadURL,
            job: req.body.job,
        });
        resume.save().then(() => {
            res.status(httpStatus.CREATED).json({
                message: 'Resume uploaded successfully',
            });
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: err.message,
            });
        });
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: err.message,
        });
    });
});


// GET /api/resume/:job
router.get('/:job/:limit/:page', passport.authenticate("jwt", { session: false }), resumeController.getResumes);

module.exports = router;