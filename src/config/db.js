const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URL ? process.env.MONGODB_URL : 'mongodb://localhost:27017/test';

module.exports = async () => {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    });
}

