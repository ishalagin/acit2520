
const request = require('request');

var getWeather = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/e33301d637d208b0d5c9f949cc232daa/${latitude},${longitude}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Cannot connect to Dark Sky Weather');
            }
            else {
                var weatherInfo = {
                    temperature: body.currently.temperature,
                    humidity: body.currently.humidity,
                    windSpeed: body.currently.summary
                };
                resolve( 
                    weatherInfo
                );
            }
        });
    })
    // request({
    //     url: `https://api.darksky.net/forecast/e33301d637d208b0d5c9f949cc232daa/${latitude},${longitude}`,
    //     json: true
    // }, (error, response, body) => {
    //     if (error) {
    //         callback('Cannot connect to Dark Sky Weather');
    //     }
    //     else {
    //         var weatherInfo = {
    //             temperature: body.currently.temperature,
    //             humidity: body.currently.humidity,
    //             windSpeed: body.currently.windSpeed
    //         };
    //         callback( 
    //             weatherInfo
    //         );
    //     }
    // });
};
module.exports = {
    getWeather
}