// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", function returnFile(req, res) {
  if(req.params.date){
    const date = createDate(req.params.date)
    if (date) {
        res.json({ "unix": date.getTime(), "utc": date.toGMTString() });
    } else {
        res.json({ "error": "Invalid Date" })
    }
  } else {
    res.json({ "unix": new Date().getTime(), "utc": new Date().toGMTString() })
  }
});

function createDate(date_string) {
  const regexp = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  const regexp2 = /^(\d{0,13})?$/;
  let date;
  switch (typeof date_string) {
    case "string":
      if (regexp2.test(date_string)) {
        date = new Date(Number(date_string * 1e3)); 
        break; 
      }
      if (regexp.test(date_string)) {
        date = new Date(date_string);
      } else {
        return console.log("Invalid Date String");
      }
      break;
    case "undefined":
    default:
      return undefined;
  }
  return date;
}