var React = require('react');

class Hp extends React.Component {
    
    constructor(props) {
        super();
            this.state = {
            text: ''
        };

        this.textLoading = this.textLoading.bind(this);
//        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    textLoading(){
        
        var phrase = 'You are not logged in';
        
        var textArr = phrase.split("");
        var textString = this.state.text;
        
        if(textArr.length === textString.length){
            clearInterval(this.state.intervalId);
        } else {
            this.setState({
                intervalId: this.state.intervalId,
                text: textString + textArr[textString.length]
            });
        }
        
        
    }
    
    componentWillMount() {
        
        var intervalId = setInterval(this.textLoading, 100);
        
        this.setState({
           intervalId: intervalId,
           text: this.state.text
       });
        
        
       // store intervalId in the state so it can be accessed later:
       
    };

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    };
    
    
    render() {
        
        return (
            <div className='textAnim' onClick={ this.textLoading }>
                { this.state.text }
            </div>
        ) 
    }
}

module.exports = Hp;