const joi = require('joi');

module.exports = {
    submitResume: joi.object().keys({
        job: joi.string().required(),
        resume: joi.string().required().base64(),
    }),
};

