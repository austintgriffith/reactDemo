/** @jsx React.DOM */
var React = require('react');
var $ = require('jquery');

module.exports =  React.createClass({

	render: function() {
		
		var style = {
			float:'right',
			width:500,
			textAlign:'right',
		};

		var openClass = this.props.open ? "btn btn-info" : "btn btn-default";
		var workingClass = this.props.working ? "btn btn-info" : "btn btn-default";
		var doneClass = this.props.done ? "btn btn-info" : "btn btn-default";
		
		return (
			<div style={style}>
					<div className="btn-group">
					  	<button onClick={this.props.handleClick} className={openClass}>Open</button>
					  	<button onClick={this.props.handleClick} className={workingClass}>Working</button>
					  	<button onClick={this.props.handleClick} className={doneClass}>Done</button>
					  	<input type="text" className="form-control" style={{width:100}} placeholder="filter" value={this.props.filter} onChange={this.props.handleChange}/>
					</div>
			</div>

		);
	}

}); 