var React = require('react');
var Todo = require('./todo.jsx');
var TodoFactory = React.createFactory(Todo);

var renderedComponent = React.renderToString(
  TodoItemFactory({done: false, name: 'Write Tutorial'})
);