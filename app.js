/**
 * Created by jonlazarini on 20/02/17.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

require('dotenv').config();
var API_KEY = process.env.API_KEY;

var getWeatherToJson = require('./utils/getWeather');
var kelvToCelc = require ('./utils/kelvToCelc')
var dateUtils = require('./utils/dateUtils')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res, next) {
    // gets the city field from the form field
    var _city = req.query.city
    // can pass additionnal query string arguments to return data (temp, etc..)
    var url = 'http://api.openweathermap.org/data/2.5/forecast\?q\='+_city+'\&APPID\='+API_KEY;

    if(_city) {
        getWeatherToJson(url)
            // returns a resolved promise to be served to the template
            .then(function(response) {
                var weatherCity = response.city
                var weatherList = response.list

               // map to create new object containing subset of data to be served to the template
                var list = weatherList.map(function(item) {
                    return {
                        date: dateUtils.getDayFromUnixTimeStamp(item.dt),
                        temp: Math.round(kelvToCelc(item.main.temp) * 10) / 10,
                        weather: item.weather
                    }
                })

                // new array to be served to the template
                var data = {
                    title: 'Ouezeur App',
                    city: weatherCity.name,
                    country: weatherCity.country,
                    // mutated response containing formatted day (day name) and temp (Celc)
                    list: list
                }

                return res.render('index', {data: data})
            })
    } else {
        res.render('index', {data: 'data object', title: 'hello world'})
    }
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
