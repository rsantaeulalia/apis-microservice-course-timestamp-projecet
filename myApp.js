var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/:date?", function returnFile(req, res) {
    const date = new Date(req.params.date);
    if (isValidDate(date)) {
        res.json({ "unix": date.getMilliseconds, "utc": date.getUTCDate() });
    } else {
        res.json({ "error": "Invalid Date" })
    }
});

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}