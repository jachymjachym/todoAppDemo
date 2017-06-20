var React = require('react');

var Header = require('./header.js');
var Main = require('./mainContent.js');


class App extends React.Component {
    constructor(props) {
        super();
        this.state = {
            logged: false
        };

    }
    
    componentWillMount() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              
            this.setState({
                logged: true
            });
          } else {
              this.setState({
                logged: false
              });
            
          }
        }.bind(this));
    };
    
    
    
    render() {
        return (
            
            <div>
                <Header logged={ this.state.logged }/>
                <Main logged={ this.state.logged }/>
            </div>
            
        )
    }
};

module.exports = App;