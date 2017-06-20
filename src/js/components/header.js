var React = require('react');
var PropTypes = require('prop-types');

class Header extends React.Component {
    constructor(props) {
        super();
        this.state = {
            items: [],
            text: ''
        };

    }
    
    render() {
        
        var headingArr = ['D','o','I','t','B','r','o'];
        
        
        return (
                <header>
                    <div>
                        <HeadingLeft letters={ headingArr }/>
                        { this.props.logged ? <LogOut /> : <LogIn /> }
                    </div>
                </header>
            )
    }
}

class HeadingLeft extends React.Component {
    
    headingUp(e){
        e.currentTarget.classList.add('highlight');
        
    };
    headingDown(e){
        e.currentTarget.classList.remove('highlight');
        
    };
    
    render() {
        
        return (
            
                <div className='h1'>
                    
                    { this.props.letters.map(function(letter, index){
                        return <div key={index} onMouseOver={ this.headingUp } onMouseOut={ this.headingDown }>
                                <span> {letter} </span>
                                </div>;
                    }.bind(this)) }
                    
                </div>
                
            );
    }
}

HeadingLeft.propTypes = {
  letters: PropTypes.array.isRequired
}

class LogOut extends React.Component {
    
    signOut() {
        firebase.auth().signOut().then(function() {
          console.log('sign out successful');
        }).catch(function(error) {
          console.log('sign out error');
        });
    };
    
    render() {
        
        return (
                <a onClick={ this.signOut }>Logout</a>
            )
    }
}

class LogIn extends React.Component {
    
    
    render() {
        
        return (
            <p>Not Authenticated</p>
            )
    }
}

module.exports = Header;