const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { pick } = require('./../utils/pick');
const { uploadResume } = require('./../utils/firebase');
const { resumeService } = require('../services');

const getResumes = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const resumes = await resumeService.getResumes(req.params.job, options);
    return res.status(httpStatus.OK).send({ resumes });
});

const submitResume = catchAsync(async (req, res) => {
    const resumeUrl = await uploadResume(req.body.resume);
    const resume = await resumeService.createResume({ resumeUrl, job: req.body.job });
    return res.status(httpStatus.CREATED).send({ resume });
});

module.exports = {
    getResumes,
    submitResume
}