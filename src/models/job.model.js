const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paginate = require('./plugins/pagination');

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: [50, 'Title must be at most 50 characters long']
    },
    description: {
        type: String,
        required: true,
        minlength: [3, 'Description must be at least 3 characters long'],
        maxlength: [500, 'Description must be at most 500 characters long']
    },
    salary: {
        type: Number,
        required: true,
        min: [0, 'Salary must be at least 0']
    },
    employer: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
}
    , { timestamps: true });

jobSchema.plugin(paginate);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;