var React = require('react');

var Hp = require('./hp.js');
var Auth = require('./Auth.js');

class SignedOut extends React.Component {
    
    render() {
        return (
            <div className='container' >
                <Auth />
            </div>
            
        )
    }
}

module.exports = SignedOut;