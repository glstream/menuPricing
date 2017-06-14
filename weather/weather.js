const request = require('request');

var getWeather = (lat, long, callback) => {

request({
    url: `https://api.darksky.net/forecast/43c6b72e8be91162c3aa43f4f87be22d/${lat},${long}`,
    json:true

}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
         callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })  
    } else{
        callback('unable to fetch weather');
    }
    
    });
};

module.exports = {getWeather}