const https = require('https');

require('dotenv').config();

module.exports = {
    get: (path) => {
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
    },

    getById: (id) => {
        const API_URL = `https://akabab.github.io/superhero-api/api/id/${id}.json`;
        return new Promise((resolve) => {
            https
                .get(API_URL, (res) => {
                    let response = '';
                    res.on('data', (data) => {
                        response += data;
                    });
                    res.on('end', () => {
                        try {
                            response = JSON.parse(response);
                            resolve(response);
                        } catch {
                            resolve(null);
                        }
                    });
                })
                .on('error', (err) => resolve(err));
        });
    },
};
