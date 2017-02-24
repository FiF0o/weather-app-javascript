/**
 * Created by jonlazarini on 22/02/17.
 */
var kelvDegree = 273.15

module.exports = function(kelv) {
    if (typeof kelv !== 'number') {
        throw new TypeError('Expected a number');
    }
    return Number(kelv) - kelvDegree
}