const request = require("request")


const geoCode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ address +".json?access_token=pk.eyJ1IjoiaGl0ZXNoZ3VwdGE4ODUxIiwiYSI6ImNraWcwcWZmejBhazMyd21xcnBndGF0OXYifQ.HnPN7PypYEHBAECNwFe_8Q&limit=1"

    request({url, json: true}, (error, response) => {

        if (error) {
            callback("Couldn't connect to GeoCoding Services" , undefined)
        } 
        else if(response.body.features.length === 0){
            callback("No matching result for your Query", undefined)
        }
        else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place_name: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode