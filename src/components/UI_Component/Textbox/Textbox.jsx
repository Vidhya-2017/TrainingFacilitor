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
       /* let errors = {};
        if (e.target.value.length === 0) {
            errors[this.props.name] = this.props.errorMessage
            errors['type'] = this.props.name
        }
        else{
            errors[this.props.name] = ""
            errors['type'] = ""
        }      
        this.setState({ errors: errors});*/
      }

    render() {      
        return (
            <>
            <Col>
                <label className="text-capitalize">{this.props.fieldLabel}</label>
                <InputGroup className= {this.props.errorMessage === undefined ? "mb-2" : "mb-1" }>                           
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
                {this.props.errorMessage !== undefined ? <div className="errorMsg">{this.props.errorMessage}</div> : null }
                {/*this.state.errors !== undefined && this.state.errors.type !== "" ? <div className="errorMsg">{this.props.errorMessage}</div> : null */}
            </Col>
         
          
          </>
        )
    }
}
  

export default Textbox;