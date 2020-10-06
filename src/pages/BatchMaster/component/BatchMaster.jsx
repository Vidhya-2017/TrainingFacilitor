import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';
import DateTimePicker from '../../../components/UI_Component/DateTimePicker/DateTimePicker';

import '../scss/BatchMaster.scss'

const locationList = [
  { "id": "25", "locationName": "Australia" },
  { "id": "26", "locationName": "Chennai" },
  { "id": "28", "locationName": "Spain" },
  { "id": "32", "locationName": "Chennai" }]
class BatchMaster extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      batchName: '',
      location: '',
      batchNM: '',
      sme: '',
      endDate: new Date(),
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
    if (this.state.batchNM.length !== 10) {
      formIsValid = false;
      errors["batchNM"] = "Enter Valid Batch NM"
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
                <h2 className="text-center">Batch Master</h2>
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
                      onChange={(e) => {
                        this.setState({ batchName: e.target.value });

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
                      fieldLabel="Batch NM"
                      value={this.state.batchNM}
                      id="batchNM"
                      type="text"
                      placeholder="Batch NM"
                      errorMessage={this.state.errors.batchNM === "" ? null : this.state.errors.batchNM}
                      name="batchNM"
                      aria-label="Batch NM"
                      aria-describedby="Batch NM"
                      onChange={(e) => {
                        this.setState({ batchNM: e.target.value });
                      }}
                    />
                    <Textbox
                      fieldLabel="SME"
                      value={this.state.sme}
                      id="sme"
                      type="text"
                      placeholder="SME"
                      errorMessage={this.state.errors.sme === "" ? null : this.state.errors.sme}
                      name="sme"
                      aria-label="sme"
                      aria-describedby="psmehone_no"
                      maxlength={10}
                      onChange={(e) => {
                        this.setState({ sme: e.target.value });
                      }}
                    />
                    <Textbox
                      fieldLabel="Requested By"
                      value={this.state.sme}
                      id="sme"
                      type="text"
                      placeholder="Requested By"
                      errorMessage={this.state.errors.sme === "" ? null : this.state.errors.sme}
                      name="sme"
                      aria-label="sme"
                      aria-describedby="psmehone_no"
                      maxlength={10}
                      onChange={(e) => {
                        this.setState({ sme: e.target.value });
                      }}
                    />
                    <Textbox
                      fieldLabel="Status"
                      value={this.state.sme}
                      id="sme"
                      type="text"
                      placeholder="Status"
                      errorMessage={this.state.errors.sme === "" ? null : this.state.errors.sme}
                      name="sme"
                      aria-label="sme"
                      aria-describedby="psmehone_no"
                      onChange={(e) => {
                        this.setState({ sme: e.target.value });
                      }}
                    />

                  </Col>
                  <Col xs={12} md={12} lg="6" >
                    <Textbox
                      fieldLabel="Count"
                      value={this.state.sme}
                      id="sme"
                      type="text"
                      placeholder="Count"
                      errorMessage={this.state.errors.sme === "" ? null : this.state.errors.sme}
                      name="sme"
                      aria-label="sme"
                      aria-describedby="psmehone_no"
                      maxlength={10}
                      onChange={(e) => {
                        this.setState({ sme: e.target.value });
                      }}
                    />
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
                    <Textbox
                      fieldLabel="Account"
                      value={this.state.sme}
                      id="sme"
                      type="text"
                      placeholder="Account"
                      errorMessage={this.state.errors.sme === "" ? null : this.state.errors.sme}
                      name="sme"
                      aria-label="sme"
                      aria-describedby="psmehone_no"
                      maxlength={10}
                      onChange={(e) => {
                        this.setState({ sme: e.target.value });
                      }}
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


export default BatchMaster;