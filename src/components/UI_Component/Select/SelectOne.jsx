import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Select from 'react-select';
import SelectStyles from './SelectStyles';

class SelectOne extends React.Component {

	constructor(props) {
		super(props)
		this.state = { value: null, errorMessage: false }
	}
	handleChange = (e) => {
		this.setState({ value: e.target.value });
		this.props.onChange(e.target.value);
	}

	render() {
		const selectionList = this.props.list !== undefined ? this.props.list : [];
		return (
			<>
				<Col>
				<label className="text-capitalize">{this.props.fieldLabel}</label>
					<Select
						id={this.props.id}
						className={this.props.className}
						name={this.props.name}
						placeholder={this.props.placeholder}
						aria-label={this.props.ariaLabel}
						aria-describedby={this.props.ariaDescribedBy}
						onChange={this.handleChange}
						options={selectionList}
						defaultValue={this.state.value}
						value={this.state.value}
						styles={SelectStyles(215)}
						isMulti={this.props.isMulti}
						closeMenuOnSelect={!this.props.isMulti}
						isDisabled={this.props.isDisabled}
					/>
					<div className="errorMsg">{this.props.errorMessage}</div>
				</Col>
			</>
		)
	}
}

SelectOne.propTypes = {
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  ariaDescribedBy: PropTypes.string,
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
};


SelectOne.defaultProps = {
	isDisabled: false,
  isMulti: false,
  ariaDescribedBy: '',
  ariaLabel: '',
  placeholder: '',
  name: '',
  id: '',
  className: '',
};

export default SelectOne;