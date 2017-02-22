/**
 * Created by jonlazarini on 22/02/17.
 */
function convertTimeUnix(unixDate) {
    // date is a UNIX timestamp - needs to be in ms to get the actual date
    return new Date(unixDate * 1000)
}


module.exports = {

    getDateFromUnixTimeStamp: function(dateStamp) {
        // retrieves date
        return convertTimeUnix(dateStamp)
    },
    getDayFromUnixTimeStamp: function(timeStamp) {
        // retrieves the day from timeStamp, [0, 1, 2, ...]
        var getDay = convertTimeUnix(timeStamp).getDay()

        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        return weekday[getDay]
    }
}