const express = require('express');
const router = express.Router();
const api = require('./api');

//save all the ids in the array
let ids = [];

//anonymous function to save all ids
(() => {
    api.get('all').then((res) => {
        //goes through all the elements and gets it's ids
        res.forEach((e) => {
            ids.push(e.id);
        });
    });
})(); //called automatically when the module its imported

//middleware (every request passes through here)
router.use((_req, _res, next) => {
    console.log(_req);
    next();
});

//defining the routes

//home route
router.get('/', (_req, res) => {
    res.redirect('/browse'); //sends it to the browse page
    //res.render(`${__dirname}/views/index`);
});

//browse route
router.get('/browse', (req, res) => {
    //gets the name from the url
    // /browse?name=batman
    const { name } = req.query;
    api.get('all').then((result) => {
        //if a name is passed trough
        if (name) {
            result = result.filter(
                //only returns the elements that match the conditional
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
    //get the id from the url
    // /character/78
    let { id } = req.params;
    api.getById(id).then((response) => {
        //if the id exists
        if (response) {
            //string to Int
            id = parseInt(id);
            let n, p; //next, previous
            //in which index is the id on the array
            let pointer = ids.indexOf(id);
            // (condition) ? true statement : false statement
            n = pointer == ids.length - 1 ? 0 : pointer + 1;
            p = pointer == 0 ? ids.length - 1 : pointer - 1;
            res.render(`${__dirname}/views/character`, {
                data: response, //element
                next: ids[n], //for the next button
                prev: ids[p], //for the previous button
            });
        } else {
            //render the not found
            res.render(`${__dirname}/views/notfound`);
        }
    });
});

//for all the routes that aren't declared before
//send the page not found,
//in other words error 404
router.get('*', (_req, res) => {
    res.render(`${__dirname}/views/notfound`);
});

module.exports = router;
