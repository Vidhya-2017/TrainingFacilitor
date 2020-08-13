import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';
import moment from 'moment';
// import DatePicker from "react-datepicker"; //for more https://reactdatepicker.com/
// import addDays from 'date-fns/addDays';
// import subDays from 'date-fns/subDays';
// import "react-datepicker/dist/react-datepicker.css";
import { InputGroup, Col } from 'react-bootstrap';
import './DateTimePicker.scss'

class DateTimePicker extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			value: props.showDate,
			errorMessage: false
		}
	}

	handleChange = (e) => {
		this.setState({ value: e });
		// const dateValue = moment(e).format("YYYY-MM-DD HH:mm:ss");
		console.log('----', e);
		this.props.onChange({ target: { value: e, name: this.props.name } });
	}


	render() {
		return (
			<>
				<Col>
					<label className="text-capitalize">{this.props.fieldLabel}</label>
					<DatePicker
						className="datePicker mb-2"
						format="yyyy-MM-dd"
						onChange={(e) => this.handleChange(e)}
						value={this.state.value}
						monthPlaceholder="mm"
						minDate={this.props.minDate}
						yearPlaceholder="yyyy"
						dayPlaceholder="dd"
						disabled={this.props.disabled}
					/>
					<div className="errorMsg">{this.props.errorMessage}</div>
				</Col>


			</>
		)
	}
}

DateTimePicker.propTypes = {
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	minDate: PropTypes.any
  };
  
  
  DateTimePicker.defaultProps = {
	disabled: false,
	placeholder: '',
	name: '',
	id: '',
	minDate: new Date(),
	className: '',
  };

export default DateTimePicker;