/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');

var Todo = React.createClass({
	render: function() {
		return (
			<div>
				A TODO HERE
			</div>
		);
	}
});

module.exports =  React.createClass({
	getInitialState: function() {
		//Loading Props as intial state because of isomorphic nonsense.
	    return this.props;
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
	    setTimeout(this.updateJira,10000);
	},
	render: function() {
		var count = 0;
		var todos;
		if(typeof this.state.jira != "undefined"){
			count = this.state.jira.length;
			todos = this.state.jira.map(function (todo) {
				console.log(todo);
				return (
					<Todo>
						a todo
					</Todo>
				);
		    });
		}
		return (
			<div className="container">
				<div className="jumbotron">
				  	<h1>Todos</h1>
				    <p>I have {count} todos loaded.</p>
				</div>
				{todos}
		    </div>
		);
	}
});
