const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { pick } = require('./../utils/pick');
const { jobService, resumeService } = require('../services');

const getJobs = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const jobs = await jobService.getJobs(options);
    return res.status(httpStatus.OK).send({ jobs });
});

const getJob = catchAsync(async (req, res) => {
    const job = await jobService.getJob(req.params.id);
    return res.status(httpStatus.OK).send({ job });
});

const createJob = catchAsync(async (req, res) => {
    const newJob = {
        title: req.body.title,
        description: req.body.description,
        salary: req.body.salary,
        employer: req.user.id,
        company: req.body.company,
        location: req.body.location,
    }
    const job = await jobService.createJob(newJob);
    return res.status(httpStatus.CREATED).send({ job });
});

const deleteJob = catchAsync(async (req, res) => {
    // check for id
    const job = await jobService.getJob(req.params.id);
    if (!job) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Job not found' });
    }
    // check if user is employer
    if (!req.user.id.equals(job.employer)) {
        return res.status(httpStatus.FORBIDDEN).send({ message: 'You are not authorized to delete this job' });
    }
    // delete Resume
    await resumeService.deleteResumes(job.id);
    // delete job
    await jobService.deleteJob(req.params.id);
    return res.status(httpStatus.OK).send({ message: 'Job deleted successfully' });
});

const updateJob = catchAsync(async (req, res) => {
    // check for id
    var job = await jobService.getJob(req.params.id);
    if (!job) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Job not found' });
    }
    // check if user is employer
    if (!req.user.id.equals(job.employer)) {
        return res.status(httpStatus.FORBIDDEN).send({ message: 'You are not authorized to update this job' });
    }
    // update job
    const updatedJob = {
        title: req.body.title,
        description: req.body.description,
        salary: req.body.salary,
        employer: req.user.id,
        company: req.body.company,
        location: req.body.location,
    }
    job = await jobService.updateJob(req.params.id, updatedJob);
    return res.status(httpStatus.OK).send({ job });
});

const searchJob = catchAsync(async (req, res) => {
    const keyword = req.params.keyword;
    const jobs = await jobService.searchJob(keyword);
    return res.status(httpStatus.OK).send({ jobs });
});

module.exports = {
    getJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
    searchJob
}