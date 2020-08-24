import React from 'react';
import MaterialTable from "material-table";
import {
  Paper, withStyles, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent,
  Button,
} from '@material-ui/core';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Buttons from '../../../components/UI_Component/Buttons/Buttons';
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import '../scss/AssesmentType.scss';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Modal from 'react-bootstrap/Modal'
import moment from 'moment';
import { FormControl } from 'react-bootstrap';
import ToastBox from '../../../components/UI_Component/Toast/ToastBox';

const styles = (theme) => ({
  iconRoot: {
    color: '#6b6b6b'
  },
  paperRoot: {
    // margin: theme.spacing(6, 18),
    // padding: theme.spacing(4),
    width: '70%',
    margin: '20px auto',
    padding: '10px 20px'
  },
});
class AssesmentType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentType: '', sucessMessage: '', errorMessage: '', errors: {},
      assessmentListVal: [],
      showAddAssessmentModal: false,
      newAssessmentScale:'',
      loading: false,
      edit: false,
      add: false,
      deleteModal: false,
      showToast: false,
      id: '',
      updated_by: '',
      rowEvents: {},
      searchQuery: '',
      toastMessage: ''
    }
    this.columnFields = [
      { title: "Name", 
      field: "assesment_type_name", 
      validate: rowData => rowData.assesment_type_name !== '',
     },
    ]
  }

  componentDidMount() {
    this.props.getAssessmentList().then((response) => {
      if (response && response.arrRes) {
        this.setState({
          assessmentListVal: response.arrRes,
          showToast: true,
          toastMessage: "Assessment Data loaded successfully"
        })
      } else {
        this.setState({
          assessmentListVal: [],
          showToast: true,
          toastMessage: "Error in loading Assessment Data"
        })
      }
    });
  }

  handleDelete = (id) => {
    const filteredItems = this.state.assessmentListVal.filter((item) => item.id !== id);
    const reqObj = {
      id: id,
      updated_by: 1
    }

    this.props.DeleteAssesmentTypeList(reqObj).then(response => {
      if (response && response.errCode === 200) {
        this.setState({
          assessmentType: '',
          assessmentListVal: filteredItems,
          deleteModal: false,
          showToast: true,
          toastMessage: "Assessment name deleted successfully",
        });
      }
      else {
        this.setState({
          assessmentType: '', deleteModal: false,
          showToast: true,
          toastMessage: "Error in Assessment name deletion"
        });
      }

    });
  }

  editSubmit = () => {
    const reqObj = {
      id: this.state.id,
      assesment_type_name: this.state.assessmentType,
      updated_by: this.state.updated_by
    }
    this.props.EditAssesmentTypeList(reqObj).then(response => {
      if (response && response.errCode === 200) {
        this.setState(prevState => ({
          assessmentListVal: prevState.assessmentListVal.map(
            el => el.id === this.state.id ? { ...el, assesment_type_name: this.state.assessmentType } : el
          )
        }))
        this.setState({
          assessmentType: '', edit: false,
          showToast: true,
          toastMessage: "Assessment name updated successfully",
        });
      }
      else if (response && response.errCode === 404) {
        this.setState({
          assessmentType: '', edit: false,
          showToast: true,
          toastMessage: " failed in updating Assessment name "
        });
      }
      else {
        this.setState({
          assessmentType: '', edit: false,
          showToast: true,
          toastMessage: "error in updating the Assessment name"
        });
      }
    });
  }

  handleModalClose = () => {
    this.setState({ showAddAssessmentModal: false, newAssessmentScale: '' })
  }

  handleModalSubmit = () => {
    const { newAssessmentScale } = this.state;
    const date = moment().format("YYYY-MM-DD");
    const reqObj = {
      assesment_type_name: newAssessmentScale,
      created_by: 1,
      updated_by: 1,
      created_date: date
    }
    this.props.setAddAssesmentTypeList(reqObj).then(response => {
      if (response && response.errCode === 200) {
        const myObj = {
          id: response.AssessmentTypeId,
          assesment_type_name: response.AssessmentTypeName
        }
        const updatedItems = [...this.state.assessmentListVal, myObj];
        this.setState({
          assessmentType: '',
          add: false,
          showAddAssessmentModal: false,
          assessmentListVal: updatedItems,
          showToast: true,
          toastMessage: "Assessment name added successfully!"
        })
      }
      else if (response && response.errCode === 404) {
        this.setState({
          assessmentType: '',
          add: false,
          showAddAssessmentModal: false,
          showToast: true,
          toastMessage: "Already Assessment type name exists!"
        })
      }
      else {
        this.setState({
          assessmentType: '',
          add: false,
          showAddAssessmentModal: false,
          showToast: true,
          toastMessage: "error in adding aseessment name!"
        })
      }
    });
  };

  render() {
    const { assessmentListVal, showAddAssessmentModal, newAssessmentScale, showToast, toastMessage } = this.state;
    const {classes} = this.props;
    return (
      <div className="AssesmentType_container">
        <Dialog
          disableBackdropClick
          maxWidth="xs"
          fullWidth={true}
          open={showAddAssessmentModal}
          onClose={this.handleModalClose}
          aria-labelledby="assessment-type"
        >
          <DialogTitle id="assessment-type">Add Assessment Scale</DialogTitle>
          <DialogContent >
            <div style={{ display: 'flex' }}>
              <Typography style={{ padding: '15px 15px 10px 0' }}>Assessment Name:</Typography>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                placeholder="Assessment Name"
                type="text"
                value={newAssessmentScale}
                onChange={(e) => this.setState({ newAssessmentScale: e.target.value })}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModalClose} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleModalSubmit} disabled={newAssessmentScale === '' || newAssessmentScale === null} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Paper className={classes.paperRoot} elevation={3}>
        <Typography variant="h4" className="text-center" gutterBottom>
          Assessment Scale
        </Typography>
        <MaterialTable
          title=""
          columns={this.columnFields}
          data={assessmentListVal}
          style={{boxShadow: 'none', border: 'solid 1px #ccc'}}
          options={{
            actionsColumnIndex: -1,
            pageSizeOptions: []
          }}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add Assessment Type',
              isFreeAction: true,
              onClick: (event) => this.setState({showAddAssessmentModal: true})
            },
          ]}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                  resolve();
                  if (oldData) {
                    console.log('----edit---', newData);
                    // setState((prevState) => {
                    //   const data = [...prevState.data];
                    //   data[data.indexOf(oldData)] = newData;
                    //   return { ...prevState, data };
                    // });
                  }
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                  resolve();
                  console.log('----delete---', oldData);

                  // setState((prevState) => {
                  //   const data = [...prevState.data];
                  //   data.splice(data.indexOf(oldData), 1);
                  //   return { ...prevState, data };
                  // });
              })
          }}
        />
        </Paper>
        {/* <section className="blue_theme">
          <Container>
            <h2 className="text-center">Assesment Type</h2>
            <Modal show={this.state.add}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                  <h2 className="text-center">Assesment Type</h2>
                </Modal.Title>
                <i id="icon" className="fa fa-times float-right" onClick={() => this.setState({ add: false })}></i>
              </Modal.Header>
              <Modal.Body>
                <Textbox
                  value={this.state.assessmentType}
                  fieldLabel="assessment type"
                  id="assessmentType"
                  type="text"
                  placeholder="assessment type"
                  errorMessage={this.state.errors.assessmentType === "" ? null : this.state.errors.assessmentType}
                  name="assessmentType"
                  aria-label="Duration"
                  aria-describedby="Duration"
                  onChange={(e) => {
                    this.setState({ assessmentType: e.target.value });
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Buttons
                  disabled={!this.state.assessmentType}
                  className="float-right"
                  value="Submit"
                  onClick={this.submitForm} />
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.edit}
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                  <h2 className="text-center">Assesment Type</h2>
                </Modal.Title>
                <i id="icon" className="fa fa-times float-right" onClick={() => this.setState({ edit: false, assessmentType: '' })}></i>
              </Modal.Header>
              <Modal.Body>
                <Textbox
                  value={this.state.assessmentType}
                  fieldLabel="assessment type"
                  id="assessmentType"
                  type="text"
                  placeholder="assessment type"
                  errorMessage={this.state.errors.assessmentType === "" ? null : this.state.errors.assessmentType}
                  name="assessmentType"
                  aria-label="Duration"
                  aria-describedby="Duration"
                  onChange={(e) => {
                    this.setState({ assessmentType: e.target.value });
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Buttons
                  className="float-right"
                  value="Update"
                  onClick={this.editSubmit} />
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.deleteModal}
              size="sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Body>
                <h6>Do you really want to delete <br /><i>{this.state.assessmentType}</i> ? </h6>
              </Modal.Body>
              <Modal.Footer>
                <Buttons
                  className="float-left"
                  value="No"
                  onClick={() => this.setState({ deleteModal: false })} />
                <Buttons
                  className="float-right"
                  value="Yes"
                  onClick={() => this.handleDelete(this.state.id)} />
              </Modal.Footer>
            </Modal>
            <i id="icon" className="fa fa-plus" onClick={() => this.setState({ add: true })}></i>
            <hr />
            <FormControl
              placeholder="Search assessment type"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={this.handleSearch}
              value={this.state.searchQuery}
            />
            <BootstrapTable
              keyField="id"
              data={assessmentListVal}
              columns={cols}
              rowEvents={rowEvents}
              pagination={paginationFactory(paginationOptions)}
            />
          </Container>
          {showToast &&
            <ToastBox showToast={showToast} toastMsg={toastMessage} />}
        </section>
       */}
      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(AssesmentType);