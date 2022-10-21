const express = require('express');
const app = express();
const port = process.env.port || 3000; //looks if it has a different environment port
const router = require('./src/router');

app.set('view engine', 'ejs');

app.use('/', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
