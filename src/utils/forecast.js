const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7acb537e887a5cf3c56d9ad6d1262910&query=' + lat + ',' + long + '&units=f'
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('unable to connect the weather app', undefined);
        } else if (body.error) {
            callback('unable to find the weather', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain. The humidity is ' + body.current.humidity + '%'

            )
        }

    })
}

module.exports = forecast;