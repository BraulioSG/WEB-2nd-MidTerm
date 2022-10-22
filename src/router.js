const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const api = require('./api');

let ids = [];
(() => {
    api.get('all').then((res) => {
        res.forEach((e) => {
            ids.push(e.id);
        });
    });
})();

//middleware (every request passes through here)
router.use((_req, _res, next) => {
    next();
});

//defining the routes

//home route
router.get('/', (_req, res) => {
    res.send('welcome');
    //res.render(`${__dirname}/views/index`);
});

//browse route
router.get('/browse', (req, res) => {
    const { name } = req.query;
    api.get('all').then((result) => {
        if (name) {
            result = result.filter(
                (sh) =>
                    sh.name.toLowerCase() == name.toLowerCase() ||
                    sh.name.toLowerCase().includes(name.toLowerCase())
            );
        }
        res.render(`${__dirname}/views/browse`, { response: result });
    });
});

//character route
router.get('/character/:id', (req, res) => {
    let { id } = req.params;
    api.getById(id).then((response) => {
        if (response) {
            id = parseInt(id);
            let n, p;
            let pointer = ids.indexOf(id);
            n = pointer == ids.length - 1 ? 0 : pointer + 1;
            p = pointer == 0 ? ids.length - 1 : pointer - 1;
            res.render(`${__dirname}/views/character`, {
                data: response,
                next: ids[n],
                prev: ids[p],
            });
        } else {
            res.render(`${__dirname}/views/notfound`);
        }
    });
});

router.get('*', (req, res) => {
    res.render(`${__dirname}/views/notfound`);
});

module.exports = router;
