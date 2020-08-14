"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var express = require("express");
var mongo = require("mongodb");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var PreciseUrl = require("./model/shorturl");
var cors = require("cors");
var dns = require("dns");
var uniqid = require("uniqid");
var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
/** this project needsa db !! **/

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
// on error while connecting the database
db.once("open", () => {
  console.log("Mongoose connected");
});
// once connected
app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
/* redirect to main link when user use the short link */

app.get("/api/shorturl/:shortid", async (req, res) => {
  try {
    console.log(req.params.shortid);
    var mainLink = await PreciseUrl.find({
      shortUrl: req.params.shortid,
    }).exec();
    res.redirect(mainLink[0].originalUrl);
  } catch {
    res.send("Invalid short url!!,Please short your link first ");
  }
});

app.post("/api/shorturl/new", (req, res) => {
  // validate the url
  var regex = /^(?:https?:\/\/)?(?:www\.)?/i;
  var url = req.body.url.replace(regex, ""); // replace the https and www from the url because the dns.lookup only work with name resolution.
  console.log(url);
  dns.lookup(`${url}`, async (err) => {
    if (err) {
      console.error(err);
      res.send("Not a valid url");
    } else {
      var shortId = uniqid();
      const newUrl = PreciseUrl({
        originalUrl: req.body.url,
        shortUrl: shortId,
      });
      await newUrl.save();
      res.json({ original_url: req.body.url, short_url: shortId });
    }
  });
});

app.listen(port, function () {
  console.log("Node.js listening ...");
});
