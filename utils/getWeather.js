/**
 * Created by jonlazarini on 21/02/17.
 */
var fetch = require('node-fetch');

module.exports = function getWeatherToJson(url) {
    return fetch(url)
        // processes url and parse it to json
        .then(function(response) {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('There was an error with your promise')
            }
        })
}