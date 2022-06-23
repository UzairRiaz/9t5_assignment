const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const employerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long']
    },
    email: {
        type: String,
        required: true,
        minlength: [3, 'Email must be at least 3 characters long'],
        maxlength: [50, 'Email must be at most 50 characters long'],
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}
    , { timestamps: true });

employerSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

employerSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
