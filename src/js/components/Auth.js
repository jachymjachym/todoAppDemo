var React = require('react');

var Hp = require('./hp.js');

class Auth extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    
    
    signUp() {
        firebase.auth().createUserWithEmailAndPassword('jachymkoudela@seznam.cz', 'sparta77').catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      };
    
    
    onChange(e) {
        if(e.target.getAttribute('type') === 'text'){
            this.setState({email: e.target.value});
        } else {
            this.setState({password: e.target.value});
        }
        
      };
    handleSubmit(e) {
        e.preventDefault();
        
        var email = this.state.email;
        var password = this.state.password;
        
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              
              switch(errorCode){
                  case 'auth/wrong-password':
                      this.setState({
                        alert: 'Spatne heslo'
                      });
                  break;
                  case 'auth/invalid-email':
                      this.setState({
                        alert: 'Spatny email'
                      });
                  break;
                  case 'auth/user-disabled':
                      this.setState({
                        alert: 'Uzivatel je zablokovany'
                      });
                  break;
                  case 'auth/user-not-found':
                      this.setState({
                        alert: 'Uživatel neexistuje'
                      });
                  break;
              }
              
              if(!error){
                  this.setState({
                    alert: ''
                  });
              }
              
              
        }.bind(this));
          
        this.setState({
            email: '',
            password: '',
            alert: ''
        });
        
        
        
      };
    
    render() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit } >
                    
                    <input type="text" onChange={ this.onChange } value={ this.state.email } placeholder="Email" />
                    <span className='faded'></span>
                    
                    <input type="password" onChange={ this.onChange } value={ this.state.password } placeholder="Password" />
                    <span className='faded'></span>
                    
                    <p>{ this.state.alert }</p>
                    <button>signin</button>
                </form>
            
                <div>
                    <Hp />
                </div>
            </div>
        )
        
    }
}

module.exports = Auth;