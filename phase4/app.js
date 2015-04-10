var express = require('express');
var app = express();

//reqire react libs
var React = require('react');
var JSX = require('node-jsx').install();
var fs = require('fs');
var exec = require('child_process').exec;

//read in template for index
var index = "Error: index.html not loaded yet.";
fs.readFile('./index.html', function (err, data) {
  if (err) throw err;
  index=data.toString();
});

//open root endpoint that renders the react element on the server side and injects it into the template
app.get('/', function(req, res){
	var Todos = React.createFactory(require('./todos.jsx'));
	var markup = React.renderToString(Todos({jira:jiraData}));
	markup+='<div id="initialState" data="'+encodeURIComponent(JSON.stringify(jiraData))+'"></div>';
	//console.log(markup);
	index = index.replace("##REACTCONTENT##",markup);
	res.send(index);
});

//bundle endpoint for compiled js
app.get('/bundle.js', function(req, res){
  	res.sendFile(__dirname +'/bundle.js');
});


//get jira data back
app.get('/jira', function(req, res){
	console.log("Getting Jira data ondemand...");
	updateJiraData(function(){
		console.log("Got data...");
		res.send(JSON.stringify(jiraData));
	});
  	
});

//read jira data from time to time to keep it up to date
var jiraData;
var jiraTimeout;
function updateJiraData(callback){
	clearTimeout(jiraTimeout);
	exec('/usr/bin/php /var/www/html/jira/get.php', function (error, stdout, stderr) {
		jiraData = JSON.parse(stdout);
		console.log("Loaded "+jiraData.length+" items from jira...");
		if(typeof callback == "function") callback();
	});
	jiraTimeout = setTimeout(updateJiraData,720000);
}
updateJiraData();

console.log("listening for connections...");
app.listen(8080);



