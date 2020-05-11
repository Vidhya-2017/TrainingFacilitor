import React from 'react';
import Button from 'react-bootstrap/Button';
import './Buttons.scss'
class Buttons extends React.Component{
    constructor(props) {
        super(props)   
       
    }  

    render() {
        return (
        <>            
        <Button  
        className={this.props.className}   
        value={this.props.value}
        onClick={this.props.onClick}
        >
            {this.props.value}
        </Button>      
        </>
        )
    }
}
  

export default Buttons;