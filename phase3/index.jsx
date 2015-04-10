var React = require('react');
var Todos = require('./todos.jsx');
var TodosFactory = React.createFactory(Todos);

var renderTarget = document.getElementById('content');

var initialState = document.getElementById('initialState').getAttribute("data");

initialState = decodeURIComponent(initialState);

var renderedComponent = React.render(
  TodosFactory({jira:JSON.parse(initialState)}),
  renderTarget
);