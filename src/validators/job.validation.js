const Joi = require('joi');

const getJobs = {
    query: Joi.object().keys({
        sortBy: Joi.string().valid('title', 'company', 'location', 'salary').default('title'),
        limit: Joi.number().integer().min(1).max(100).default(10),
        page: Joi.number().integer().min(1).default(1),
    }),
};

const getJob = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const createJob = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        salary: Joi.number().integer().min(1).default(0),
        company: Joi.string().required(),
        location: Joi.string().required(),
    }),
};

const deleteJob = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

const updateJob = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        salary: Joi.number().integer().min(1).optional(),
        employer: Joi.string().optional(),
        company: Joi.string().optional(),
        location: Joi.string().optional,
    }),
};


module.exports = {
    getJobs,
    getJob,
    createJob,
    deleteJob,
    updateJob,
};