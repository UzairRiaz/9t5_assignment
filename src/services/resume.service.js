const mongoose = require('mongoose');
const Resume = mongoose.model('Resume');

const getResumes = async (id, options) => {
    const resume = await Resume.paginate({ job: id }, options);
    return resume;
}

const createResume = async (resume) => {
    const newResume = await Resume.create(resume);
    return newResume;
}

const deleteResumes = async (job) => {
    await Resume.deleteMany({ job });
}


module.exports = {
    getResumes,
    createResume,
    deleteResumes
}
