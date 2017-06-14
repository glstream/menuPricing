const request = require('request');
const yargs = require('yargs');
const geoCode = require('./geocode/geocode');
const weather = require('./weather/weather');
const menu = require('./menu/latte');
const express = require('express');

var app = express();
const port = process.env.PORT || 3000;

const argv = yargs.options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string:true
        }

}).help()
    .alias('help', 'h')
    .argv;


geoCode.geoCodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
         weather.getWeather(results.lat, results.long, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                menu.latte(weatherResults.temperature, (errorMessage, menuResults) => {
                     if (errorMessage) {
                    console.log(errorMessage);
                     } else {
                         console.log(`It's currently ${weatherResults.temperature} degress with a apparent temperature of ${weatherResults.apparentTemperature}.`);
                         console.log(`The price of a Latte is Currenty: ${menuResults.price}`)
                     }
                })
    
            }
        });
    }
});

// menu.latte(5.01, (errorMessage, results) => {
//     console.log('latte')
// })



// darkSky API key

//43c6b72e8be91162c3aa43f4f87be22d
//https://api.darksky.net/forecast/43c6b72e8be91162c3aa43f4f87be22d/38.3286205,-121.9359339
// app.get('/' ,(req, res) => {
//     res.send('header1');
//     res.send()
//  });

// app.listen(port, () => {
//   console.log(`Started up at port ${port}`);
// });