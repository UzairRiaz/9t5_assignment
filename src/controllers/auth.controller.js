const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { employerService } = require('../services');

const register = catchAsync(async (req, res) => {
    const employer = await employerService.createEmployer(req.body);
    res.status(httpStatus.CREATED).send({ employer });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const employer = await employerService.login(email, password);
    res.status(httpStatus.OK).send({ token: employer.token });
});


module.exports = {
    register,
    login
};