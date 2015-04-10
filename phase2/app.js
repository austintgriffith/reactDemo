var express = require('express');
var app = express();

//open root endpoint that renders the index
app.get('/', function(req, res){
	res.sendFile(__dirname +'/index.html');
});

console.log("listening for connections...");
app.listen(8080);





