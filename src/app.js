const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require("./utils/geoCode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

// define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')


// setup static directory
app.use(express.static(publicDirPath))


// setup handlebar engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

app.get('/', (req,res) => {
    res.render('index',{
        title: "Weather",
        name: " Hitesh Gupta "
    })
})

app.get('/about', (req,res) => {
    res.render('about' , {
        title: "About",
        name: " Hitesh Gupta "
    })
})

app.get('/help', (req,res) => {
    res.render('help' , {
        title: "Help",
        name: " Hitesh Gupta "
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "please provide a search query"
        })
    }
    res.send({
        product: []
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "please provide an Location!"
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if(error){
            return res.send({
            error: error
        })
        }
    
        forecast(latitude, longitude, (error, {currentTemp, feelTemp, visibility,humidity, wind_speed}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                Address: place_name,
                forecast:{
                    CurrentTemp: 'Current temperature is: ' + currentTemp,
                    FeelsLikeTemp: "It Feels like: " + feelTemp,
                    Visibility: "Visibility is " + visibility,
                    Humidity: "Humidity is " + humidity,
                    Wind_speed: "Wind speed is " + wind_speed
                }
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "Check your Route...",
        name: "Hitesh Gupta",
        errorMessage: "help article not found 404!"
    })
})


app.get('*', (req,res) => {
    res.render('404' , {
        title: "404: not found!!",
        name: "Hitesh Gupta",
        errorMessage: "Page not found 404!"
    })
})


app.listen(port, () => {
    console.log("Server is live on port: " + port)
})

