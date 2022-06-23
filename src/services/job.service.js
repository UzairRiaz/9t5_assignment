const mongoose = require('mongoose');
const Job = mongoose.model('Job');

const getJobs = async (query) => {
    const jobs = await Job.paginate({}, query);
    return jobs;
}

const getJob = async (id) => {
    const job = await Job.findById(id);
    return job;
}

const createJob = async (job) => {
    const newJob = await Job.create(job);
    return newJob;
}

const deleteJob = async (id) => {
    const job = await Job.findByIdAndDelete(id);
    return job;
}

const updateJob = async (id, job) => {
    const updatedJob = await Job.findByIdAndUpdate(id, job, { new: true });
    return updatedJob;
}

const searchJob = async (keyword) => {
    const jobs = await Job.find({
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { company: { $regex: keyword, $options: 'i' } },
            { location: { $regex: keyword, $options: 'i' } },
        ]
    });
    return jobs;
}

module.exports = {
    getJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
    searchJob
}