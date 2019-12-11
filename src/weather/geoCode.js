const request = require('request');
const geoSecToken = 'pk.eyJ1Ijoic3BpZGVyMTIiLCJhIjoiY2szeDFzaHBtMDd5ZDNkczhzd2twdWtqbyJ9.ee-8xob3HLu6-8bOylfknw';
const geoUrl    = `https://api.mapbox.com/geocoding/v5/mapbox.places/{place}.json?lang=ar&limit=2&access_token=${geoSecToken}`;





// geo location sevice
let getGeoLocation = (address,callBack)=> {
    let lUrl = geoUrl.replace('{place}',address);
    request(
        {
            method: "GET",
            uri: lUrl,
            json: true
        }
        ,
        (err, response, body) => {
            if (err) {
                callBack(null);
                console.log("can not reach geolocation service");
            } else if (response.statusCode !== 200 || body.features.length <=0) {
                console.log("can't find location. Try another search");
                callBack(null)
            } else {
                callBack({
                    lat: body.features[0].center[1],
                    lon: body.features[0].center[0],
                    name: body.features[0].place_name
                });

            }
        }
    );
};


module.exports = getGeoLocation;