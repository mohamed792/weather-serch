const express = require('express');
const path = require('path');
const hdbs = require('hbs');
const port = process.env.PORT || 4440;
const getGeoCode = require('./weather/geoCode');
const getWeather = require('./weather/weatherForecast');


const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../views/partials');

// seting view engines  handle bars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hdbs.registerPartials(partialsPath);


// middle wares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(publicPath));


app.get('/', (req, res) => {
    let args = "home";
    res.render('home', {'title': args});
});

app.get('/weather', (req, res) => {
    let address = req.query.address;
    if (address) {
        getGeoCode(address, (geoCode) => {
            if (geoCode) {
                getWeather(geoCode, (weatherState) => {
                    if (weatherState) {
                        return res.send({
                            summary: weatherState.daily.data[0].summary,
                            heigh_temperature: weatherState.daily.data[0].temperatureHigh,
                            low_temperature: weatherState.daily.data[0].temperatureLow,
                            location: geoCode.name
                        });

                    } else {
                        return res.send({error: 'can not map your address with weather state'});

                    }
                });
            } else {
                return res.send({error: 'can not find your location ,Try another one'});

            }

        })
    } else {
        return res.send({error: 'address not provides'});
    }
});


app.get('/about', (req, res) => {
    let args = "about";
    res.render('about', {'title': args});
});


// handling unfounded pages
app.get('*', (req, res) => {
    res.render('404');
});

app.listen(port, () => {
    console.log("server is listening on port 4444");
});