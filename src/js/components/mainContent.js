var React = require('react');
var Header = require('./header.js');
var SignedOut = require('./signedout.js');
var TodoList = require('./todolist.js');

class Main extends React.Component {

  render() {
      
      return (
          <div>
            { this.props.logged ? <TodoList /> : <SignedOut /> }
          </div>
      )

  }
};

module.exports = Main;