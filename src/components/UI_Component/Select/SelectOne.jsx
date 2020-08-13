import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import Select from 'react-select';
import SelectStyles from './SelectStyles';

class SelectOne extends React.Component {

	constructor(props) {
		super(props)
		this.state = { value: null, errorMessage: false, options: props.options }
	}

	static getDerivedStateFromProps(props, state) {
		if (props.options !== state.options) {
      return {
        options: props.options
      };
    }
		return null;
	}


	handleChange = (e) => {
		this.setState({ value: e });
		this.props.onChange({ target: { ...e, name: this.props.name } });
	}

	render() {
		const { options } = this.state;
		return (
			<>
				<Col className="mb-2">
				<label className="text-capitalize">{this.props.fieldLabel}</label>
					<Select
						placeholder={this.props.placeholder}
						onChange={this.handleChange}
						options={options}
						defaultValue={this.state.value}
						value={this.state.value}
						styles={SelectStyles()}
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