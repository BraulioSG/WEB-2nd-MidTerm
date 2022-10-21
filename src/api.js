require('dotenv').config();

function get() {
    try {
        const API_URL = `https://superheroapi.com/api/${process.env.API_KEY}`;
        return API_URL;
    } catch {
        return process.env.API_KEY || 0000000000;
    }
}

exports.get = get;
