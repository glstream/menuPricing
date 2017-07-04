const request = require('request');


var getSquare = () => {
    request({
        url:`https://connect.squareup.com/v2/locations`,
        json:true,
        headers: {
            'Authorization': 'Bearer ' + 'sandbox-sq0atb-ZqB1yLMqM2Ibjjnj8lZBMA',
        }
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
                console.log(JSON.stringify(body.locations[0].name, undefined, 2));
               //console.log(JSON.stringify(address.locality, undefined, 2));

        } else {
            console.log('unable to connect');
        }   

    })
};

getSquare();



// square API token sq0atp-Fi7aUH4w_UFtU-b8mFC2VQ

//v2 connect token sandbox-sq0atb-ZqB1yLMqM2Ibjjnj8lZBMA


// "Your request did not include an `Authorization` http header with an access token. The header value is expected to be of the format "Bearer TOKEN" (without quotation marks), where TOKEN is to be replaced with your access token (e.g. "Bearer ABC123def456GHI789jkl0"). For more information, see https://docs.connect.squareup.com/api/connect/v2/#requestandresponseheaders. If you are seeing this error message while using one of our officially supported client libraries, please report this to developers@squareup.com. "
