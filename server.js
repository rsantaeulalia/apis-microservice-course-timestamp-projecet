// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", function returnFile(req, res) {
  if (req.params.date) {
    console.log(req.params.date);
    const date = createDate(req.params.date);
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
  const regexp3 = /^(([0-9])|([0-2][0-9])|([3][0-1]))\s(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}$/;
  let date;
  switch (typeof date_string) {
    case "string":
      if (regexp2.test(date_string)) {
        date = new Date(Number(date_string));
        break;
      }
      if (regexp.test(date_string)) {
        date = new Date(date_string);
        break;
      } 
      if (regexp3.test(date_string)) {
        console.log(date_string);
        date = convertFromStringToDate(date_string);
        break;
      } 
      date = undefined;
      break;
    case "undefined":
    default:
      return undefined;
  }
  return date;
}

function convertFromStringToDate(dateString) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

  let dateComponents = dateString.split(' ');
  if (dateComponents) {
    let day = dateComponents[0];
    let month = monthNames.indexOf(dateComponents[1]);
    let year = dateComponents[2];

    return new Date(year, month, day, 0, 0, 0, 0);
  }
}