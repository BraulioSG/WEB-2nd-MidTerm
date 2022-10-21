const express = require('express');
const router = express.Router();
const api = require('./api');
//middleware (every request passes through here)
router.use((req, _res, next) => {
    console.log(
        `new request: http:/localhost:${process.env.port || 3000}${req.url} `,
        Date.now()
    );
    next();
});

//defining the routes

//home route
router.get('/', (_req, res) => {
    let response = api.get();
    console.log(response);
    res.render(`${__dirname}/views/index`, { result: response });
});

module.exports = router;
