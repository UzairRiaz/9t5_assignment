const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paginate = require('./plugins/pagination');

const resumeSchema = new Schema({
    resumeUrl: {
        type: String,
        required: true,
    },
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    }
}, { timestamps: true });

resumeSchema.plugin(paginate);

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;