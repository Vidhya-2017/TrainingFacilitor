import React from 'react';
import { render } from 'react-dom';
import { Modal, Button, InputGroup, FormControl, ListGroup, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';

import '../scss/BatchFormation.scss'

class BatchFormation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: new Date(),
      batchName: '',
      location: '',
      batchNM: '',
      sme: '',
      startDate: new Date(),
      endDate: new Date(),
      errors: {},
      eventSelected: null,
      EventDetailsList: [],
      batchSelected: null,
      batchDetailsList: [],
      showUserModal: false,
      newBatchName: '',
      newBatchCount: '',
      candidateList: [],
      query: ''
    }
    this.candidateList = [];
  }
  componentDidMount() {
    this.props.getTrainingList().then((response) => {
      if (response && response.arrRes) {
        const eventList = response.arrRes.map(list => {
          return {
            value: list.id,
            label: list.training_name,

          }
        });
        this.setState({ EventDetailsList: eventList, loading: false });
      } else {
        this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
      }
    });
  }

  onChangeTraining = (eventSelected) => {
    console.log("Onchange", eventSelected.target);
    this.setState({ eventSelected: eventSelected.target, batchSelected: null });
    const tID = eventSelected.target.value;
    this.getBatchList(tID);
  }
  getBatchList = (id) => {
    const reqObj = {
      training_id: id
    };
    this.props.getBatchList(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        const batchList = response.arrRes.map(list => {
          return {
            value: list.batch_id,
            label: list.batch_name
          }
        });
        this.setState({ batchDetailsList: batchList, loading: false });
      } else {
        this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
      }
    });
  }

  addBatchName = () => {
    this.setState({ showUserModal: true });
  }
  handleClose = () => this.setState({ showUserModal: false });

  batchNameOnChange = (e) => {
    this.setState({ newBatchName: e.target.value })
  }
  batchCntOnChange = (e) => {
    this.setState({ newBatchCount: e.target.value })
  }
  handleNewBatchSubmit = () => {
    const { newBatchName, eventSelected, newBatchCount } = this.state;
    console.log('EventName', eventSelected);

    const reqObj = {
      training_id: eventSelected.value,
      batch_name: newBatchName,
      batch_count: newBatchCount,
      created_by: 1
    }
    console.log('-RequestObject-', reqObj);

    this.props.addBatchName(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        console.log("--Response--", response.Result);
        this.getBatchList(eventSelected.value);
        this.setState({ showUserModal: false });
      }
    });

  }

  onChangeBatch = (batchSelected) => {

    this.setState({ batchSelected: batchSelected.target });

    const reqObj = {
      training_id: this.state.eventSelected.value,
      batch_id: batchSelected.target.value
    }
    console.log("---OnBatchChange---", reqObj);

    this.props.getCandidateMapList(reqObj).then((response) => {
      if (response && response.errCode === 200) {

        const candidateList = response.arrRes;
        let assignedCan = candidateList.filter(batch => batch.batch_id > 0);
        this.candidateList = candidateList;
        this.setState({ candidateList });
      }
    });


  }

  handleCandidateSelection = (e, list) => {
    const { candidateList, batchSelected } = this.state;
    const candidateIndex = candidateList && candidateList.findIndex((lst) => list.id === lst.id);
    const updatedcandidateList = [...candidateList];
    updatedcandidateList[candidateIndex].batch_id = e.target.checked ? batchSelected.value : '';
    this.setState({
      candidateList: updatedcandidateList
    });
  }
  submitForm = (e) => {
    const { eventSelected, batchSelected } = this.state;
    const reqObj = {
      batch_id: batchSelected.value,
      candidate_ids: this.CandidateIDs,
      // EventID: eventSelected.value,
      created_by: 1,

    }

    console.log(this.CandidateIDs, 'reqObj---', reqObj);

    this.props.insertCandidateBatchMap(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        console.log("SUBMIT", response);
      }
    })
  }

  searchCandidate = (e) => {
    console.log('searchCandidate---', this.candidateList);
    const query = e.target.value;
    const lowerCaseQuery = query.toLowerCase();
    const searchedData = (query
      ? this.candidateList.filter((list) =>
        list['first_name']
          .toLowerCase()
          .includes(lowerCaseQuery)
      )
      : this.candidateList);
    this.setState({ candidateList: searchedData, query });
  }


  render() {
    const { eventSelected, EventDetailsList, query, batchSelected, batchDetailsList, showUserModal, newBatchName, newBatchCount, candidateList } = this.state;
    this.CandidateIDs = [];
    candidateList.forEach(list => {
      if (list.batch_id !== null && list.batch_id !== '') {
        this.CandidateIDs.push(list.id);
      }
    })

    return (
      <div className="batchFormation_container">
        <section className="blue_theme">
          <Container>
            <Row>
              <Col xs={12} md={12} lg="12" >
                <h2 className="text-center">Batch Formation
                <i onClick={this.addBatchName} className="addUser fa fa-plus"></i></h2>
              </Col>
            </Row>

            <Row>
              <Col > Training list   </Col>
              <Col  >
                <SelectOne
                  value={eventSelected}
                  onChange={this.onChangeTraining}
                  options={EventDetailsList}
                  defaultValue={eventSelected}
                  placeholder="Select Training"
                  aria-label="training"
                  aria-describedby="training"
                  id="training"
                />
              </Col>
            </Row>
            <Row>
              <Col>Batch list</Col>
              <Col>
                <SelectOne
                  value={batchSelected}
                  onChange={this.onChangeBatch}
                  options={batchDetailsList}
                  defaultValue={batchSelected}
                  placeholder="Select Batch"
                  aria-label="batch"
                  aria-describedby="batch"
                  id="batch"
                /> 
              </Col>
              {/* {eventSelected && <Col>
                <Buttons
                  className="float-right"
                  value="Add"
                  onClick={this.addBatchName} />

              </Col>} */}
            </Row>
            {candidateList && candidateList.length > 0 && <div>
              <p className='memberLabel'>Candidate List: Count - {this.CandidateIDs.length} </p>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search Candidates"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={query}
                  onChange={this.searchCandidate}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon1" >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>}

            {candidateList && candidateList.length > 0 && <div className="candidateList">
              <ListGroup className="userListGroup">
                {candidateList.map(list =>
                  <ListGroup.Item key={list.id} className="userList">
                    <div className="candidateDetails">
                      <p>{list.first_name} {list.last_name} </p>
                      {/*   <p className="email">{list.SkillName}</p> */}
                    </div>
                    <Form.Check
                      type="checkbox"
                      size="lg"
                      id={list.id}
                      checked={list.batch_id !== null && list.batch_id !== ''}
                      label=""
                      className='toggleUser'
                      onChange={(e) => this.handleCandidateSelection(e, list)}
                    />
                  </ListGroup.Item>
                )}
              </ListGroup>
            </div>}
            {candidateList && candidateList.length > 0 && <Row>
              <Col>
                <Buttons
                  className="submitBtn float-right"
                  value="Submit"
                  disabled={this.CandidateIDs.length === 0}
                  onClick={this.submitForm} />
              </Col>
            </Row>}
          </Container>
        </section>
        <Modal className='eventModal' show={showUserModal} centered onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Batch Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Textbox
              value={newBatchName}
              fieldLabel="Batch Name"
              id="batchName"
              type="text"
              placeholder="Batch Name"
              name="batchName"
              onChange={this.batchNameOnChange}
            />
            <Textbox
              fieldLabel="Count"
              value={newBatchCount}
              id="count"
              type="number"
              placeholder="Count"
              name="count"
              onChange={this.batchCntOnChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Buttons
              className="float-right"
              value="Submit"
              disabled={newBatchName.length === 0}
              onClick={this.handleNewBatchSubmit}
            />

          </Modal.Footer>
        </Modal>
      </div>

    )
  }
}


export default BatchFormation;