const express = require('express');
const router = express.Router();
const api = require('./api');

//middleware (every request passes through here)
router.use((req, _res, next) => {
    let now = new Date();
    console.log(
        `new request: http:/localhost:${process.env.port || 3000}${req.url} `,
        Date.UTC(now.getMilliseconds())
    );
    next();
});

//defining the routes

//home route
router.get('/', (_req, res, next) => {
    api.get('all').then((response) => {
        res.render(`${__dirname}/views/index`, { result: response });
    });
});

module.exports = router;
