const mongoose = require('mongoose');
const Employer = mongoose.model('Employer');
const { bcryptPassword, generateToken } = require('./auth.service');

const createEmployer = async (employeeBody) => {
    if (await Employer.isEmailTaken(employeeBody.email)) {
        throw new Error('Email is already taken');
    }
    const hasedPassword = await bcryptPassword(employeeBody.password);
    const newEmployer = {
        name: employeeBody.name,
        email: employeeBody.email,
        password: hasedPassword
    }
    const employer = await Employer.create(newEmployer);
    return employer;
}

const login = async (email, password) => {
    const employer = await Employer.findOne({ email });
    if (!employer) {
        throw new Error('Email is not registered');
    }
    const isPasswordMatch = await employer.isPasswordMatch(password);
    if (!isPasswordMatch) {
        throw new Error('Password is incorrect');
    }
    return { token: generateToken(employer) };
}

module.exports = {
    createEmployer,
    login
};