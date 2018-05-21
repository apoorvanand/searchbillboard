// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var results=[];
var billboard = require("billboard-top-100").getChart;
var date="";

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/results", function (request, response) {
  response.send([date, results.reverse()]);
  results=[];
  date="";
});

app.post("/results", function (request, response) {
  
  // get billboard chart for date with format YYYY-MM-DD
  billboard('hot-100', request.query.date, function(songs, err){
    if (err){
      console.log(err);
      date=request.query.date;
      results.push({rank: err, artistName: "", title: "", image: "cdn.glitch.com/dae1b9f3-1a2d-4014-bc18-d1d054f8de0a%2Ffish.png?1501076084163"})
    } else {
      songs.forEach(function(result){
        var cover = result.cover
        if(!cover) // default cover image when it doesn't have it
          cover="cdn.glitch.com/dae1b9f3-1a2d-4014-bc18-d1d054f8de0a%2Ffish.png?1501076084163";
        results.push({rank: result.rank, artistName: result.artist, title: result.title, image: cover});
      });
      date=request.query.date;
    }
    response.sendStatus(200);
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});