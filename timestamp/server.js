// server.js
// where your node app starts

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// init project

var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)

var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/", function (req, res) {
  let date = new Date();
  res.send({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/timestamp/:date_string", function (req, res) {
  let recDate = +req.params.date_string; // converted timestamp into number
  let stringTime;
  if (isNaN(recDate)) {
    // check the recieve timeStamp is Nan
    stringTime = new Date(req.params.date_string);
    sendTimestamp(stringTime);
  } else {
    stringTime = new Date(recDate);
    sendTimestamp(stringTime);
  }
  function sendTimestamp(date) {
    if (isNaN(date.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      if (date.getTime() < 0) {
        res.json({ error: "Invalid Date" });
      }
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
  }
});

// listen for requests :)
app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + process.env.PORT);
});
