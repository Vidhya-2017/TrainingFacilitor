import React from 'react';
import DatePicker from "react-datepicker";
import addDays from 'date-fns/addDays';
import "react-datepicker/dist/react-datepicker.css";
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DateTimePicker.scss'

class DateTimePicker extends React.Component{

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        
        this.onChange = this.props.onChange;
        this.state= {value:'', errorMessage: false}
            this.state = {
                value: props.showDate,
            }
    }
    handleChange(e) {      
        this.setState({value: e});    
        this.onChange(e);
      }


    render() {
        return (
            <>
            <Col>
                <label className="text-capitalize">{this.props.fieldLabel}</label>
                <InputGroup className= {this.props.errorMessage === undefined ? "mb-2" : "mb-1" }>  
                {this.props.isdisabled === "true" ? 
                    <DatePicker
                    className="form-control"
                    placeholderText ={this.props.placeholder}
                    selected={this.state.value}
                    minDate={ this.props.minDate}
                    maxDate={addDays(new Date(), 5)}
                    onChange={(e) => this.handleChange(e)}                    
                    disabled
                        />       
                    : 
                    <DatePicker
                    className="form-control"
                    placeholderText ={this.props.placeholder}
                    selected={this.state.value}
                    minDate={ this.props.minDate}
                    maxDate={addDays(new Date(), this.props.maxDays)}
                    onChange={(e) => this.handleChange(e)}
                    
                    />
                }             
               
                </InputGroup>
                <div className="errorMsg">{this.props.errorMessage}</div>
            </Col>
         
          
          </>
        )
    }
}
  

export default DateTimePicker;