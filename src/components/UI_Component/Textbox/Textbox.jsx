import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Textbox extends React.Component{

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.props.onChange;
        this.state= {value:'', errorMessage: false}
            this.state = {
                value:''
            }
       
    }
     handleChange(e) {       
        this.setState({value: e.target.value});    
        this.onChange(e.target.value);
      }

    render() {
        return (
            <>
            <Col>
                <label className="text-uppercase">{this.props.fieldLabel}</label>
                <InputGroup className= {this.props.errorMessage === undefined ? "mb-3" : "mb-1" }>                           
                <FormControl
                    id={this.props.id}
                    className = {this.props.className}
                    style={this.props.style}
                    onChange={(e) => this.handleChange(e)}
                    name={this.props.name}
                    value={this.props.value ? this.props.value : this.state.value}
                    placeholder={this.props.placeholder}
                    aria-label={this.props.ariaLabel}
                    aria-describedby={this.props.ariaDescribedBy}
                    type = {this.props.type}
                    disabled = {this.props.isDisabled}
                    maxlength = {this.props.maxlength}
                    minLength ={this.props.minlength}
                />         
               
                </InputGroup>
                <div className="errorMsg">{this.props.errorMessage}</div>
            </Col>
         
          
          </>
        )
    }
}
  

export default Textbox;