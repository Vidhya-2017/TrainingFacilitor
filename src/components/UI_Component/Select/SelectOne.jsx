import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SelectOne extends React.Component{

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
        const selectionList = this.props.list !== undefined ? this.props.list : [];
        return (
            <>
            <Col>
                <label className="text-uppercase">{this.props.fieldLabel}</label>
                <InputGroup className="mb-3">                           
                <FormControl as="select" 
                 id={this.props.id}
                 className = {this.props.className}
                 style={this.props.style}               
                 name={this.props.name}                
                 placeholder={this.props.placeholder}
                 aria-label={this.props.ariaLabel}
                 aria-describedby={this.props.ariaDescribedBy}                
                size = {this.props.size}
                onChange={(e) => this.handleChange(e)}
                >
                    <option value=''>{this.props.placeholder}</option>
                    {selectionList.length !== 0 && selectionList.length !== undefined ? 
                    selectionList.map((item) => {
                        return(<option value ={item.id}>{item.Duration}</option>);
                    }) : null}
                   
                   
                    </FormControl> 
                </InputGroup>
                <div className="errorMsg">{this.props.errorMessage}</div>
            </Col>
         
          
          </>
        )
    }
}
  

export default SelectOne;