const joi = require('joi');

const submitResume = {
    body: joi.object().keys({
        resume: joi.string().required(),
        job: joi.string().required(),
    }),
};

const getResumes = {
    params: joi.object().keys({
        job: joi.string().required(),
    }),
    query: joi.object().keys({
        sortBy: joi.string().valid('title', 'company', 'location', 'salary').default('title'),
        limit: joi.number().integer().min(1).max(100).default(10),
        page: joi.number().integer().min(1).default(1),
    }),
};

module.exports = {
    submitResume,
    getResumes,
};