const express = require('express');
const hbs = require('hbs');
const weather_info = require('./weather.js')
const fs = require('fs');

const port = process.env.PORT || 8080;


var app = express();
var weather = ''; //variable to hold the weather info



app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'))


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('message', (text) =>{
    return text.toUpperCase()
})
hbs.registerHelper('getCurrentTime', () => {
    return new Date().getTime()
})

// app.get('/', (request, response) => {
//     var return_string = '<a href="/about.hbs">About Me</a> <br>\n' +
//                         '<a href="/weather.hbs">Weather</a>'
//     response.send(return_string)
// });

// app.get('/', (request, response) => {
//     // response.send('<h1>Hello Express!</h1>');
//     response.send({
//         name: 'Your name',
//         school: [
//             'BCIT',
//             'SFU',
//             'UBC'
//         ]
//     })
// });

// app.use((request, response, next) =>{
//     var time = new Date().toString();
//     //console.log(`${time}: ${request.method} ${request.url}`)
//     var log = `${time}: ${request.method} ${request.url}`
//     fs.appendFile('server.log', log + '\n', (error) =>{
//         if (error) {
//             console.log('Unable to log message');
            
//         }
//     });
//     next();
// });

// app.use((request, response, next) => {
//     response.render('maint.hbs') 

// })



app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'Home'
    })
})

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About stuff',
        welcome: 'Hello!',
        image: '20170502_115304.jpg'
    });
});

app.get('/weather', (request, response) =>{
    response.render('weather.hbs', {
        title: 'weather',
        weather: weather,

    })

})
// here add routes

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
    weather_info.getWeather(49.246292, -123.1207).then((result) =>{
        weather = `The temperature in Vancouver is: ${result.temperature}`
        console.log(weather)
    })
});



