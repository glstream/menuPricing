const request = require('request');
const yargs = require('yargs');
const geoCode = require('./geocode/geocode');
const weather = require('./weather/weather');
const express = require('express');
var cron = require('node-cron');
// self made 
const menu = require('./menu/latte');
const { MongoClient, ObjectID } = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;




cron.schedule('* * * * *', function(){
zip = '98103'
    geoCode.geoCodeAddress(zip, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
         weather.getWeather(results.lat, results.long, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                menu.latte(weatherResults.temperature, (errorMessage, latteResults) => {
                     if (errorMessage) {
                    console.log(errorMessage);
                     } else {
                         app.get('/', (req, res)=> {
                             res.send(`It's currently ${weatherResults.temperature} degress with a apparent temperature of ${weatherResults.apparentTemperature}.
                                        The price of a Coffee is Currenty: ${latteResults.price}`)
                         })
                         console.log(`It's currently ${weatherResults.temperature} degress with a apparent temperature of ${weatherResults.apparentTemperature}.`);
                         console.log(`The price of a Latte is Currenty: ${latteResults.price}`)
                     }
                     
                MongoClient.connect('mongodb://glstream:Stream100@ds139262.mlab.com:39262/category', (err, db)=>{
                        if (err) {
                            return console.log('Unable to connect to Mongodb Server');
                        }
                        console.log('Connected to Mongo DB server');

                    db.collection('menu').update({
                            product: 'Latte'
                                }, {
                            $set: {
                                price: latteResults.price
                                }
                            }, {
                            returnOriginal: false
                        }).then((result) => {
                            console.log(result.matchedCount);
                        })
                    db.close();
                })
                      
                })
    
            }
        });
    }
});








geoCode.geoCodeAddress(zip, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage)
    } else {
         weather.getWeather(results.lat, results.long, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                menu.coffee(weatherResults.temperature, (errorMessage, coffeeResults) => {
                     if (errorMessage) {
                    console.log(errorMessage);
                     } else {
                         app.get('/a', (req, res)=> {
                             res.send(`It's currently ${weatherResults.temperature} degress with a apparent temperature of ${weatherResults.apparentTemperature}.
                                        The price of a Coffee is Currenty: ${coffeeResults.price}`)
                         })
                         console.log(`The price of a Coffee is Currenty: ${coffeeResults.price}`)
                     }
                     MongoClient.connect('mongodb://glstream:Stream100@ds139262.mlab.com:39262/category', (err, db)=>{
                        if (err) {
                            return console.log('Unable to connect to Mongodb Server');
                        }
                        console.log('Connected to Mongo DB server');

                    db.collection('menu').update({
                            product: 'Coffee'
                                }, {
                            $set: {
                                price: coffeeResults.price
                                }
                            }, {
                            returnOriginal: false
                        }).then((result) => {
                            console.log(result.matchedCount);
                        })
                    db.close();
                })
                     
                })
    
            }
        });
    }
});
  
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

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});