import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';
import ToastBox from '../../../components/UI_Component/Toast/ToastBox';
import DateTimePicker from '../../../components/UI_Component/DateTimePicker/DateTimePicker';
import '../scss/TrainingCreation.scss'

const inputField = {
	value: '',
	validation: {
		required: true
	},
	valid: false
};

const trainingRegForm = {
	batchName: { ...inputField },
	duration: { ...inputField },
	location: { ...inputField },
	requestBy: { ...inputField },
	account: { ...inputField },
	count: { ...inputField },
	skills: { ...inputField },
	plannedEndDate: { ...inputField },
	plannedStDate: { ...inputField },
	actualEndDate: { ...inputField },
	actualStDate: { ...inputField },
}
class TrainingCreation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			errors: {},
			formValues: { ...trainingRegForm },
			showToast: false,
			toastMsg: '',
			skillList: [],
			locationList: [],
			accountList: [],
			selectedSkill: null,
			selectedAccount: null,
			selectedlocation: null,
			formIsValid: false
		}
	}

	componentDidMount() {
		this.getSkillList();
		this.getLocation();
		this.getAccount();
	}
	getAccount = () => {
		this.props.getAccount().then(response => {
			if (response && response.arrRes) {
				const accountList = response.arrRes.map(list => {
					return {
						value: list.id,
						id: list.id,
						label: list.account_name
					}
				});
				this.setState({ accountList });
			} else {
				this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
			}
		})
	}
	getLocation = () => {
		this.props.getLocation().then(response => {
			if (response && response.arrRes) {
				const locationList = response.arrRes.map(list => {
					return {
						value: list.id,
						id: list.id,
						label: list.location_name
					}
				});
				this.setState({ locationList });
			} else {
				this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
			}
		})
	}
	getSkillList = () => {
		this.props.getSkillList().then(response => {
			if (response && response.arrRes) {
				const skillList = response.arrRes.map(list => {
					return {
						value: list.id,
						id: list.id,
						label: list.skill_name
					}
				});
				this.setState({ skillList });
			} else {
				this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
			}
		})
	}




	inputFieldChange = (e) => {
		const targetName = e.target.name;
		const targetValue = e.target.value;
		const updatedRegForm = {
			...this.state.formValues
		};
		const updatedFormElement = {
			...updatedRegForm[targetName]
		};
		updatedFormElement.value = targetValue;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedRegForm[targetName] = updatedFormElement;
		let formIsValid = true;
		for (let inputIdentifier in updatedRegForm) {
			formIsValid = updatedRegForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({ formValues: updatedRegForm, formIsValid });
	}

	checkValidity(inputValue, rules) {
		const value = inputValue.toString();
		let isValid = true;
		if (!rules) {
			return true;
		}
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid
		}
		return isValid;
	}


	submitForm = () => {
		const formData = {};
		const { formValues } = this.state;
		const resetRegisterEvent = {
			...formValues
		};
		for (let inputIdentifier in resetRegisterEvent) {
			formData[inputIdentifier] = resetRegisterEvent[inputIdentifier].value;
		}
    console.log('---submit---');
		// let reqObj = {
		// 	account: formData.account,
		// 	actualEndDate: moment(formData.actualEndDate).format("YYYY-MM-DD HH:mm:ss"),
		// 	actualStDate: moment(formData.actualStDate).format("YYYY-MM-DD HH:mm:ss"),
		// 	batchName: formData.batchName,
		// 	count: formData.count,
		// 	duration: formData.duration,
		// 	location: formData.location,
		// 	plannedEndDate: moment(formData.plannedEndDate).format("YYYY-MM-DD HH:mm:ss"),
		// 	plannedStDate: moment(formData.plannedStDate).format("YYYY-MM-DD HH:mm:ss"),
		// 	requestBy: formData.requestBy,
		// 	skills: formData.skills,
		// 	CreatedBy: 1,
		// 	UpdatedBy: 1
		// }
    // console.log('----formData--', reqObj);
    this.setState({ formValues: {...trainingRegForm}, selectedAccount: null, selectedLocation: null,
    selectedSkill: null});
	}

  selectFieldChange = (e) => {
    if(e.target.name === 'location') {
      this.setState({ selectedLocation: e.target });
    }

    if(e.target.name === 'account') {
      this.setState({ selectedAccount: e.target });
    }
    if(e.target.name === 'skills') {
      this.setState({ selectedSkill: e.target });
    }
    this.inputFieldChange(e);
  }

	render() {
		const { skillList, showToast, toastMsg, formIsValid, selectedSkill, selectedAccount, selectedLocation, locationList, accountList, formValues } = this.state;
    console.log('--formValues.actualStDate.value---', formValues.actualStDate.value);
    return (
			<div className="batchMaster_container">
				<section className="blue_theme">
					<Container>
						<Row>
							<Col xs={12} md={12} lg="12" >
								<h2 className="text-center">Training Register</h2>
							</Col>
						</Row>
						<Col xs={12} md={12} lg="12" >
							<form className="">
								<Row>
									<Col xs={12} md={12} lg="6" >
										<Textbox
											value={formValues.batchName.value}
											fieldLabel="Batch Name"
											id="batchName"
											type="text"
											placeholder="Batch Name"
											errorMessage={this.state.errors.batchName === "" ? null : this.state.errors.batchName}
											name="batchName"
											onChange={this.inputFieldChange}
										/>
										<SelectOne
											fieldLabel="Location"
											id="location"
											name="location"
											placeholder="Location"
											value={selectedLocation}
											options={locationList}
											onChange={this.selectFieldChange}
											errorMessage={this.state.errors.location === "" ? null : this.state.errors.location}
										/>
										<Textbox
											fieldLabel="Duration"
											value={formValues.duration.value}
											id="duration"
											type="text"
											placeholder="Duration"
											errorMessage={this.state.errors.duration === "" ? null : this.state.errors.duration}
											name="duration"
											onChange={this.inputFieldChange}
										/>
										<SelectOne
											fieldLabel="Account"
											id="account"
											name="account"
											value={selectedAccount}
											placeholder="Account"
											options={accountList}
											onChange={this.selectFieldChange}
											errorMessage={this.state.errors.account === "" ? null : this.state.errors.account}
										/>

										<Textbox
											fieldLabel="Requested By"
											value={formValues.requestBy.value}
											id="requestBy"
											type="text"
											placeholder="Requested By"
											errorMessage={this.state.errors.requestBy === "" ? null : this.state.errors.requestBy}
											name="requestBy"
											onChange={this.inputFieldChange}
										/>

										<Textbox
											fieldLabel="Count"
											value={formValues.count.value}
											id="count"
											type="number"
											placeholder="Count"
											errorMessage={this.state.errors.count === "" ? null : this.state.errors.count}
											name="count"
											onChange={this.inputFieldChange}
										/>
									</Col>
									<Col xs={12} md={12} lg="6" >
										<SelectOne
											fieldLabel="Skills"
											id="skills"
											name="skills"
											placeholder="Skills"
											value={selectedSkill}
											options={skillList}
											onChange={this.selectFieldChange}
											errorMessage={this.state.errors.skills === "" ? null : this.state.errors.skills}
										/>
										<DateTimePicker
											value={formValues.actualStDate.value}
											fieldLabel="Actual Start Date"
											minDate={new Date()}
											name="actualStDate"
											onChange={this.inputFieldChange}
										/>
										<DateTimePicker
											fieldLabel="Actual End Date"
											value={formValues.actualEndDate.value}
											name="actualEndDate"
											disabled={formValues.actualStDate.value === ''}
											minDate={formValues.actualStDate.value}
											onChange={this.inputFieldChange}
										/>
										<DateTimePicker
											fieldLabel="Planned Start Date"
											value={formValues.plannedStDate.value}
											name="plannedStDate"
											minDate={new Date()}
											onChange={this.inputFieldChange}
										/>
										<DateTimePicker
											value={formValues.plannedEndDate.value}
											fieldLabel="Planned End Date"
											name="plannedEndDate"
											disabled={formValues.plannedStDate.value === ''}
											minDate={formValues.plannedStDate.value}
											onChange={this.inputFieldChange}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Buttons
											className="float-right"
											value="Submit"
											// disabled={!formIsValid}
											onClick={this.submitForm} />
									</Col>
								</Row>
							</form>
						</Col>
					</Container>
				</section>
				{showToast &&
					<ToastBox showToast={showToast} toastMsg={toastMsg} />}
			</div>
		)
	}
}


export default TrainingCreation;