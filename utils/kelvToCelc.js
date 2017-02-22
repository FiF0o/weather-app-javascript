/**
 * Created by jonlazarini on 22/02/17.
 */
var kelvDegree = 273.15

module.exports = function(kelv) {
    return kelv - kelvDegree
}