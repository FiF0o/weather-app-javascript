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
    var url = 'http://api.openweathermap.org/data/2.5/forecast\?q\='+_city+'\&APPID\='+API_KEY;

    if(_city) {
        getWeatherToJson(url)
            // returns a resolved promise to be served to the template
            .then(function(response) {
                var weatherCity = response.city
                var weatherList = response.list

                var data = {
                    city: weatherCity.name,
                    country: weatherCity.country,
                    weatherList: weatherList
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
