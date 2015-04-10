/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');

module.exports =  React.createClass({
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
		var colorClass = "";
		if(this.props.data.status == "Open") colorClass="list-group-item-warning";
		if(this.props.data.status == "In Development") colorClass="list-group-item-info";
		if(this.props.data.status == "Waiting for QA") colorClass="list-group-item-success";
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