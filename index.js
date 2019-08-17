const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAOEXtFfROFentchCyCKzd8mLduhrEZ7Hk'
});
const port = 3000 || process.env.PORT;

//Middleware for cors
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send(`The Afto Map Api is running @ ${port}`);
})

app.listen(port, function (req, res) {
    console.log(`Server is running @ ${port}`);
})

//API call for distance
app.get('/distance', mapDistance);

function mapDistance (req, res) {
    const options = {
        origin: req.query.origin,
        destination: req.query.destination
    }
    googleMapsClient.directions(options, function (err, response) {
        if (!err) {
            console.log(response);
            res.json(response.json.routes[0].legs)
        }
    });
}

