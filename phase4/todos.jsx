/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');

var Todo = React.createClass({
	/*
		this.props.data looks like this:
		{ key: 'UXI-210',
		  project: 'UXI',
		  type: 'Improvement',
		  typeIcon: 'https://madsoftware.atlassian.net/images/icons/issuetypes/improvement.png',
		  link: 'https://madsoftware.atlassian.net/rest/api/2/issue/11169',
		  summary: 'play around with haproxy backends for word press logged in vs logged out ',
		  status: 'Open',
		  desc: null,
		  priority: 'Minor',
		  priorityIcon: 'https://madsoftware.atlassian.net/images/icons/priorities/minor.png' 
		}
	*/
	render: function() {
		var colorClass = "info";
		if(this.props.data.status == "Open") colorClass="list-group-item-info";
		if(this.props.data.status == "In Development") colorClass="list-group-item-success";
		colorClass="list-group-item "+colorClass;

		var link = "https://madsoftware.atlassian.net/browse/"+this.props.data.key

		return (
			<a target={this.props.data.key} href={link} className={colorClass}>
			    <b className="list-group-item-heading">
			    	<img style={{paddingRight:5}} src={this.props.data.typeIcon}/>
			    	{this.props.data.key}: {this.props.data.summary}
			    </b>
			    <p className="list-group-item-text">
			    	<small>{this.props.data.desc}</small>
			    </p>
			</a>
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
	    setTimeout(this.updateJira,3000);
	},
	render: function() {
		var count = 0;
		var todos;
		if(typeof this.state.jira != "undefined"){
			count = this.state.jira.length;
			todos = this.state.jira.map(function (todo) {
				return (
					<Todo data={todo} key={todo.key}/>
				);
		    });
		}
		return (

			<div className="container" style={{paddingTop:18}}>
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
