const request = require('request');


var geoCodeAddress = (addi, callback) => {

var encodedAddress = encodeURI(addi); 

request({
    url:`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    if (error) {
        callback('Unable to connect to Google servers');
    } else if(body.status === 'ZERO_RESULTS'){
        callback('The address you entered is not correct');
    } else if (body.status ==='OK'){
        callback(undefined, {
            address: response.body.results[0].formatted_address,
            lat:body.results[0].geometry.location.lat,
            long:body.results[0].geometry.location.lng
        })
        }
    });
}

module.exports = {
    geoCodeAddress
}
