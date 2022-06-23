const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

// config env file
require('dotenv').config();

// connect to database
require('./src/config/db')();

// Models
require('./src/models');

const jwtStrategy = require('./src/config/passport');

// FOr Header Security
app.use(helmet());

// Body Parser
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

// XXS Protection & Sanitization
app.use(xss());
app.use(mongoSanitize());

// enabling all CORS
app.use(cors());
app.options('*', cors());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
require("./src/config/passport")(passport);

//Routes
app.use('/api/', require('./src/routes'));

const port = process.env.PORT ? process.env.PORT : 5000;

app.listen(port, () => {
    // eslint-disable-next-line padded-blocks
    console.log(`Listening to Port: ${port}`);
});