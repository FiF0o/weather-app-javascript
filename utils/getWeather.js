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
        // catching any error and passing it down the chain
        .catch(function(err) {
            console.log('catching err: ' + err)
            return 'There has been a problem with your fetch operation: ' + err.message
        })
}