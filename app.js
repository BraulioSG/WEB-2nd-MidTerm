const express = require('express');
const router = require('./src/router');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000; //looks if it has a different environment port

//EXPRESS SETTINGS
//express view engine
app.set('view engine', 'ejs');

//public folder
app.use(express.static(path.join(__dirname, 'public')));

//define the main rout for the router
app.use('/', router);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`Server at: http://localhost:${port}`);
});
