const request = require('request');
const darkSkySecToken = 'b72b4baf97d80531cb28cddd14d2051e';
const darkSkyUrl = `https://api.darksky.net/forecast/${darkSkySecToken}/{lat},{lon}?exclude=[hourly]&lang=ar&units=si`;



//  get  weather  conditions
let getWeather = (geoCode,callBack)=>{
    let lUrl = darkSkyUrl.replace('{lat}',geoCode.lat).replace('{lon}',geoCode.lon);
    request(
        {
            method:"GET",
            uri:lUrl,
            json:true
        }
        ,
        (err,response,body)=>{
            if(err){
                console.log("can not reach weather service");
                callBack(null);
            }else if(response.body.error){
                console.log("can't find the location");
                callBack(null);
            }else {
                callBack(body);
            }
        }
    );
};


module.exports = getWeather;