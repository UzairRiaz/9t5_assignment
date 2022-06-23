const joi = require('joi');

module.exports = {
    createJob: joi.object().keys({
        title: joi.string().required().max(50),
        description: joi.string().required().min(3).max(500),
        salary: joi.number().required().min(0),
        company: joi.string().required(),
        location: joi.string().required(),
    }),
};

