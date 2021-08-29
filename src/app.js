const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// setting port
const port = process.env.PORT || 3000

// setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))
// defining path
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ashwaq Ali Khan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ashwaq Ali Khan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ashwaq Ali Khan',
        helpText: 'This is help text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'You must provide a Address'
        })
    }
    geocode(req.query.address, (err, { latitude, longitude, location } = { }) => {
        if (err) {
            return res.send(err)
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send(err)
            }
            res.send({
                forecast: forecastData,
                location, //short hand
                address: req.query.address,
            })
        })
    })

})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a search'
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ashwaq Ali Khan',
        errorMessage: 'Help sub page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ashwaq Ali Khan',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server listening on port ' + port);
})