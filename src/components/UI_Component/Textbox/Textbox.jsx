import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Textbox extends React.Component{

    constructor(props) {
        super(props)
        this.state= {value:'', errorMessage: false}
            this.state = {
                value: this.props.value
            }      
    }

   
     handleChange = (e) => {       
        this.setState({value: e.target.value});    
        this.props.onChange(e.target.value);
    }

      componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
          this.setState({value : nextProps.value});
        }
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
                    value={ this.state.value}
                    placeholder={this.props.placeholder}
                    aria-label={this.props.ariaLabel}
                    aria-describedby={this.props.ariaDescribedBy}
                    type = {this.props.type}
                    disabled = {this.props.isDisabled}
                    maxLength = {this.props.maxlength}
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