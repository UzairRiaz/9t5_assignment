const express = require('express');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/heartbeat',
        route: require('./hello'),
    },
    {
        path: '/job',
        route: require('./jobs'),
    },
    {
        path: '/auth',
        route: require('./auth'),
    },
    {
        path: '/resume',
        route: require('./resume'),
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;