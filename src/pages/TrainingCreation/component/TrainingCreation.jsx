import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';
import DateTimePicker from '../../../components/UI_Component/DateTimePicker/DateTimePicker';
import '../scss/TrainingCreation.scss'

const locationList = [
	{ "id": "25", "locationName": "Australia" },
	{ "id": "26", "locationName": "Chennai" },
	{ "id": "28", "locationName": "Spain" },
	{ "id": "32", "locationName": "Chennai" }]
class TrainingCreation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			startDate: '',
			batchName: '',
			location: '',
			duration: '',
			sme: '',
			endDate: '',
			errors: {}
		}
	}

	//Validation
	validateform() {
		let errors = {};
		let formIsValid = true;
		if (this.state.batchName.length === 0) {
			formIsValid = false;
			errors["batchName"] = "Enter Valid batch name"
		}
		if (this.state.location.length === 0) {
			formIsValid = false;
			errors["location"] = "Enter Valid location"
		}
		this.setState({ errors: errors });
		return formIsValid;
	}



	submitForm = (e) => {
		e.preventDefault();
		if (this.validateform()) {
			var date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
			const details = {
				assesment_type_name: this.state.assType,
				created_by: 1,
				updated_by: 1,
				created_date: date
			}
			this.props.setAddBatchMasterList(details);
			setTimeout(
				function () {
					this.setState({
						sucessMessage: "Data saved sucessfully!",
						assType: '',
					})
				}.bind(this), 1500);
			this.dissmissModel();
		}
	}
	dissmissModel = () => {
		setTimeout(
			function () {
				this.setState({ sucessMessage: "" });
			}.bind(this),
			4000);
	}



	render() {
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
											value={this.state.batchName}
											fieldLabel="Batch Name"
											id="batchName"
											type="text"
											placeholder="Batch Name"
											errorMessage={this.state.errors.batchName === "" ? null : this.state.errors.batchName}
											name="batchName"
											aria-label="Batch Name"
											aria-describedby="Batch Name"
											onChange={(val) => {
												this.setState({ batchName: val });

											}}
										/>
										<SelectOne
											fieldLabel="Location"
											id="location"
											name="location"
											placeholder="Location"
											aria-label="location"
											aria-describedby="location"
											size="1"
											list={locationList}
											onChange={(val) => {
												this.setState({ location: val });
											}}
											errorMessage={this.state.errors.location === "" ? null : this.state.errors.location}
										/>
										<Textbox
											fieldLabel="Duration"
											value={this.state.duration}
											id="duration"
											type="text"
											placeholder="Duration"
											errorMessage={this.state.errors.duration === "" ? null : this.state.errors.duration}
											name="duration"
											aria-label="duration"
											aria-describedby="Duration"
											maxlength={10}
											onChange={(val) => {
												this.setState({ duration: val });
											}}
										/>
										<Textbox
											fieldLabel="Requested By"
											value={this.state.requestBy}
											id="requestBy"
											type="text"
											placeholder="Requested By"
											errorMessage={this.state.errors.requestBy === "" ? null : this.state.errors.requestBy}
											name="requestBy"
											aria-label="requestBy"
											aria-describedby="requestBy"
											maxlength={10}
											onChange={(val) => {
												this.setState({ requestBy: val });
											}}
										/>
										<Textbox
											fieldLabel="Account"
											value={this.state.account}
											id="account"
											type="text"
											placeholder="Account"
											errorMessage={this.state.errors.account === "" ? null : this.state.errors.account}
											name="account"
											aria-label="account"
											aria-describedby="account"
											maxlength={10}
											onChange={(val) => {
												this.setState({ account: val });
											}}
										/>
										<Textbox
											fieldLabel="Count"
											value={this.state.count}
											id="count"
											type="text"
											placeholder="Count"
											errorMessage={this.state.errors.count === "" ? null : this.state.errors.count}
											name="count"
											aria-label="count"
											aria-describedby="count"
											maxlength={10}
											onChange={(val) => {
												this.setState({ count: val });
											}}
										/>
									</Col>
									<Col xs={12} md={12} lg="6" >

										<DateTimePicker
											fieldLabel="Actual Start Date"
											isdisabled="true"
											showDate={this.state.startDate}
											onChange={(val) => {
												this.setState({ startDate: val });
											}}
										/>
										<DateTimePicker
											fieldLabel="Actual End Date	"
											isdisabled="false"
											minDate={new Date()}
											maxDays={8}
											showDate={this.state.endDate}
											onChange={(val) => {
												this.setState({ endDate: val });
											}}
										/>
										<DateTimePicker
											fieldLabel="Planned Start Date"
											isdisabled="true"
											showDate={this.state.startDate}
											onChange={(val) => {
												this.setState({ startDate: val });
											}}
										/>
										<DateTimePicker
											fieldLabel="Planned End Date"
											isdisabled="true"
											minDate={new Date()}
											// maxDays ={8}
											showDate={this.state.endDate}
											onChange={(val) => {
												this.setState({ endDate: val });
											}}
										/>

										<SelectOne
											fieldLabel="Skills"
											id="skills"
											name="skills"
											placeholder="Skills"
											aria-label="skills"
											aria-describedby="skills"
											size="1"
											list={locationList}
											onChange={(val) => {
												this.setState({ skills: val });
											}}
											errorMessage={this.state.errors.skills === "" ? null : this.state.errors.skills}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<Col>
											<Buttons
												className="float-right"
												value="Submit"
												onClick={this.submitForm} />
										</Col>
									</Col>
								</Row>
							</form>
						</Col>





					</Container>
				</section>
			</div>
		)
	}
}


export default TrainingCreation;