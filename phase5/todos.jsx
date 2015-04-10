/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');


var Todo = require('./todo.jsx');
var Filter = require('./filter.jsx');

module.exports =  React.createClass({
	getInitialState: function() {
		//Loading Props as intial state because of isomorphic nonsense.
		var initialState = this.props;
		initialState.open = true;
		initialState.working = true;
		initialState.done = true;
		initialState.filter = "";

	    return initialState;
	},
	componentDidMount: function() {
		console.log("componentDidMount...");
		this.updateJira();
	},
	updateJira: function(){
		console.log("Loading data...");
	    $.get("/jira", function(result) {
			this.setState({
				jira:JSON.parse(result)
			});
	    }.bind(this));
	    setTimeout(this.updateJira,3000);
	},
	handleFilterButton:function(){
		var type = event.target.innerHTML.toLowerCase();
		console.log("Setting "+type);
		this.state[type] = !this.state[type];
		this.setState(this.state,function(){
			console.log(this.state);
		});

	},
	handleFilterText:function(){
		this.setState({filter:event.target.value});
	},
	applyFilter:function(todo){
		if(todo.status=="Open" && this.state.open) ||
			(todo.status=="In Development" && this.state.working) ||
			(todo.status=="Waiting for QA" && this.state.done) ){

			console.log("Filtering based on: "+this.state.filter);

			//so far, just the correct ones are displayed, now filter by the text filter
			if(this.state.filter=="") 
				return true;
			else if((todo.status.indexOf(this.state.filter)>=0) ||
					(todo.key.indexOf(this.state.filter)>=0) ||
					(todo.summary.indexOf(this.state.filter)>=0) ||
					(todo.desc.indexOf(this.state.filter)>=0) ||
					(todo.priority.indexOf(this.state.filter)>=0) )
				return true;

		}
		return false;
	},
	render: function() {
		var count = 0;
		var todos;
		if(typeof this.state.jira != "undefined"){
			count = this.state.jira.length;
			todos = this.state.jira.map(function (todo) {
				//only return items that match the state for open, working, and done
				if(applyFilter(todo))
				{
					return (
						<Todo data={todo} key={todo.key}/>
					);
		    	}.bind(this);
		    }.bind(this));
		}
		return (

			<div className="container" style={{paddingTop:18}}>

				<Filter handleClick={this.handleFilterButton} handleChange={this.handleFilterText} open={this.state.open} working={this.state.working} done={this.state.done} filter={this.state.filter}/>
			
				<a target="_Blank" href="https://madsoftware.atlassian.net/secure/CreateIssue!default.jspa">
					<div className="btn btn-default">
						<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add
					</div>
				</a>
				<div className="list-group" style={{paddingTop:10}}>
				{todos}
				</div>
		    </div>
		);
	}
});
