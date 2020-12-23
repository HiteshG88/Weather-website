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
            // we can also send an object.
            callback(undefined, 
                'Current temperature is '+ response.body.current.temperature + ' Deg but it feels like '+response.body.current.feelslike + ' Deg.'
                // currentTemp: response.body.current.temperature,
                // feelsLikeTemp: response.body.current.feelslike,
                // location: response.body.location.name
            )
        }
    })
}


module.exports = forecast





