const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bcryptPassword = async (password) => {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const generateToken = (employer) => {
    return jwt.sign({ id: employer._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

module.exports = {
    bcryptPassword,
    generateToken
}