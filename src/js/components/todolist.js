var React = require('react');

var Header = require('./header.js');
var Main = require('./mainContent.js');

class TodoList extends React.Component {
    
    constructor(props) {
        super();
            this.state = {
                text: '',
                done: false,
                items: []
            };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    
    
    onChange(e) {
        this.setState({text: e.target.value});
    };
    
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text && this.state.text.trim().length !== 0) {
            
            firebase.database().ref('todoApp/items').push({
                text: this.state.text,
                done: false
            });
            
            
            this.setState({
                text: ''
            });
        }
    };
    
    removeItem(key) {
        var firebaseRef = firebase.database().ref('todoApp/items');
        firebaseRef.child(key).remove();
    };
    
    setDone(key, text) {
        
        var updateStatus = {
            text: text,
            done: true
        }
        
        var updates = {};
        
        updates['/todoApp/items/' + key] = updateStatus;
        
        firebase.database().ref().update(updates);
    
    };
    
    setNotDone(key, text) {
        
        var updateStatus = {
            text: text,
            done: false
        } 
        
        var updates = {}
        
        updates['/todoApp/items/' + key] = updateStatus;
        
        firebase.database().ref().update(updates);
    };
    
    firebaseCall(){
        this.firebaseRef = firebase.database().ref('todoApp/items');
        
        this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
            
            var items = [];
            
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                items.push(item);
            });

            this.setState({
                text: this.state.text,
                done: this.state.done,
                items: items
            });
            
        }.bind(this));
    }
  

    componentWillMount() {
        this.firebaseCall()
        
    };
    
    componentWillUnmount() {
        this.firebaseRef.off();
    };
    
    
    
    
    render() {
        
        var _this = this;
        
        var item = function(item, index){
            
            return (
                <li key={index}>
                    <span className={ item.done ? 'done' : '' }>{ item.text } </span>
                    { item.done ? <span className='uncheck' onClick={ _this.setNotDone.bind(null, item.key, item.text ) }></span> : <span className='check' onClick={ _this.setDone.bind(null, item.key, item.text ) }></span> } 
                    <span className='remove' onClick={ _this.removeItem.bind(null, item.key ) } ></span>
                </li>
            );
        };
        
        return (
            <div className='container'>
            
                <ul>{ this.state.items.map(item) }</ul>
        
                <form onSubmit={ this.handleSubmit }>
                  <input onChange={ this.onChange } value={ this.state.text } /> 
                  <button>Add</button>
                </form>
                  
                  
            </div>
        )
    }
}

module.exports = TodoList;