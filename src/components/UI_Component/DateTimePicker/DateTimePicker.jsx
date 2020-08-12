import React from 'react';
import DatePicker from "react-datepicker"; //for more https://reactdatepicker.com/
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import "react-datepicker/dist/react-datepicker.css";
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import './DateTimePicker.scss'

class DateTimePicker extends React.Component{

    constructor(props) {
        super(props)
            this.state = {
                value: props.showDate,
                errorMessage: false
            }
    }
    handleChange = (e) => {      
        this.setState({value: e});    
        this.props.onChange(e);
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
                    minDate={subDays(new Date(), this.props.minDays)}
                    maxDate={addDays(new Date(), this.props.maxDays)}
                    showMonthDropdown
                    showYearDropdown
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