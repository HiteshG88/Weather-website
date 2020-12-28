const request = require("request")


const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=282cc8dbb2640d9b5f64dc78623def52&query=" + latitude +","+longitude+ "&units = m"

    request({url: url, json: true}, (error, response) => {

        if(error){
            callback("Couldn't connect to Weather Services", undefined)
        }
        else if(response.body.error){
            callback("Unable find the location", undefined)
        }
        else
        {
            // console.log(response.body);
            // we can also send an object.
            callback(undefined,{
                currentTemp: response.body.current.temperature,
                feelTemp: response.body.current.feelslike,
                visibility: response.body.current.visibility,
                humidity: response.body.current.humidity,
                wind_speed: response.body.current.wind_speed,
                weather_descriptions: response.body.current.weather_descriptions[0], //! doesn't work
            })
        }
    })
}


module.exports = forecast





