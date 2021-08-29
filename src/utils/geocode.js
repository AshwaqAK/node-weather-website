const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXNod2FxYWxpa2hhbiIsImEiOiJja3NzZmxzd2IwNW5lMnZuczQ4eHNhZXMzIn0.2LXexr6CPZ5xPPBpDTRcTA&limit=1'
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('unable to connect to geocode');
        } else if (body.features.length === 0) {
            callback('unable to find the geocode');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode



// Geocoding
// Address -> Lat/Long -> Weather

// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/bangalore.json?access_token=pk.eyJ1IjoiYXNod2FxYWxpa2hhbiIsImEiOiJja3NzZmxzd2IwNW5lMnZuczQ4eHNhZXMzIn0.2LXexr6CPZ5xPPBpDTRcTA&limit=1'
// request({ url: geocodeUrl, json: true }, (err, res) => {
//     if (err) {
//         console.log('unable to connect to geocode');
//     } else if (res.body.features.length === 0) {
//         console.log('unable to find the geocode');
//     }
//     const latitude = res.body.features[0].center[1];
//     const longitude = res.body.features[0].center[0];
//     console.log(latitude, longitude);
// })