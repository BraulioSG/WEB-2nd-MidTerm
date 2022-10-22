const https = require('https');

require('dotenv').config();

function get(path) {
    const API_URL = `https://akabab.github.io/superhero-api/api/${path}.json`;
    return new Promise((resolve) => {
        https
            .get(API_URL, (res) => {
                let response = '';
                res.on('data', (data) => {
                    response += data;
                });
                res.on('end', () => {
                    response = JSON.parse(response);
                    resolve(response);
                });
            })
            .on('error', (err) => resolve(err));
    });
}

exports.get = get;
