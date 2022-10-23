const https = require('https');

//module exports all the following functions
module.exports = {
    //arrow function for get
    get: (path) => {
        //concat the URL API with the path passed as a parameter
        const API_URL = `https://akabab.github.io/superhero-api/api/${path}.json`;

        //generates a promise (a value that will take time to resolve)
        return new Promise((resolve) => {
            //send the petition to the url
            https
                .get(API_URL, (res) => {
                    //appends all the data
                    let response = '';
                    res.on('data', (data) => {
                        response += data;
                    });
                    //after all the data is gathered
                    res.on('end', () => {
                        //converts the string into JSON
                        response = JSON.parse(response);
                        resolve(response); //the JSON is what is gonna to return in the promise
                    });
                })
                .on('error', (err) => resolve(err)); //otherwise returns the error in the promise
        });
    },

    //arrow function for get Id
    getById: (id) => {
        //concat the URL API with the id passed as a parameter
        const API_URL = `https://akabab.github.io/superhero-api/api/id/${id}.json`;
        return new Promise((resolve) => {
            https
                .get(API_URL, (res) => {
                    let response = '';
                    res.on('data', (data) => {
                        response += data;
                    });

                    //after gathering all the data
                    res.on('end', () => {
                        //try and catch to avoid the page crashes
                        try {
                            //if the response can be converted (the id exists)
                            response = JSON.parse(response);
                            resolve(response); //returns json in the promise
                        } catch {
                            //if not (the id doesn't exists and the api sends a html)
                            resolve(null); //returns null in the promise
                        }
                    });
                })
                .on('error', (err) => resolve(err));
        });
    },
};
