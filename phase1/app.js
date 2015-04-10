var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world, this is phase 1!');
});

console.log("listening for connections...");
app.listen(8080);





