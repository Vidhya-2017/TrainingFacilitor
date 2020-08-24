import React, { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import {
  Paper, Stepper, Dialog, DialogTitle, TextField, DialogActions, DialogContent,
  DialogContentText, IconButton, Grid, ListItemSecondaryAction, Step, Button, Typography,
  StepLabel, withStyles
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
  trainingName: { ...inputField },
  trainingType: { ...inputField },
  duration: { ...inputField },
  location: { ...inputField },
  requestBy: { ...inputField },
  account: { ...inputField },
  count: { ...inputField },
  skills: { ...inputField },
  assignSME: { ...inputField },
  programManager: { ...inputField },
  plannedEndDate: { ...inputField },
  plannedStDate: { ...inputField },
  actualEndDate: { ...inputField },
  actualStDate: { ...inputField },
}

const styles = (theme) => ({
  paperRoot: {
    width: '70%',
    margin: '20px auto',
    padding: '10px 20px'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  gridRoot: {
    flexGrow: 1,
  },
  bottomBtn: {
    justifyContent: 'flex-end',
    display: 'flex',
    marginTop: 10
  },
  addBtn: {
    marginTop: 27,
    marginLeft: 20
  },
  listRoot: {
    width: '100%',
    minWidth: 360,
    maxWidth: 450,
    padding: 0,
    backgroundColor: theme.palette.background.paper,
    border: 'solid 1px lightgray'
  },
});

class TrainingCreation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      errors: {},
      formValues: { ...trainingRegForm },
      showToast: false,
      toastMsg: '',
      skillList: [],
      locationList: [],
      accountList: [],
      selectedSkill: [],
      EventDetailsList: [],
      trainingTypeList: [],
      eventSelected: null,
      selectedAccount: null,
      selectedTrainingType: null,
      selectedProgramManager: null,
      selectedlocation: null,
      batchDetailsList: [],
      formIsValid: false,
      showAddBatchModal: false,
      newBatchName: '',
      newBatchCount: ''
    }
  }

  componentDidMount() {
    this.getSkillList();
    this.getLocation();
    this.getAccount();
    this.getTrainingType();
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
  getTrainingType = () => {
    this.props.getTrainingType().then(response => {
      if (response && response.arrRes) {
        const trainingTypeList = response.arrRes.map(list => {
          return {
            value: list.id,
            id: list.id,
            label: list.type
          }
        });
        this.setState({ trainingTypeList });
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

  getTrainingList = () => {
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
    if (inputValue) {
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
    let reqObj = {
      account: formData.account,
      actualEndDate: moment(formData.actualEndDate).format("YYYY-MM-DD HH:mm:ss"),
      actualStDate: moment(formData.actualStDate).format("YYYY-MM-DD HH:mm:ss"),
      trainingName: formData.trainingName,
      count: formData.count,
      duration: formData.duration,
      location: formData.location,
      trainingType: formData.trainingType,
      plannedEndDate: moment(formData.plannedEndDate).format("YYYY-MM-DD HH:mm:ss"),
      plannedStDate: moment(formData.plannedStDate).format("YYYY-MM-DD HH:mm:ss"),
      requestBy: formData.requestBy,
      skills: formData.skills,
      CreatedBy: 1,
      UpdatedBy: 1
    }
    // console.log('reqObj---', reqObj);
    this.props.registerTraining(reqObj).then(result => {
      this.setState({
        formValues: { ...trainingRegForm }, selectedAccount: null, selectedTrainingType: null, selectedLocation: null,
        selectedSkill: null
      });
    })
  }

  selectFieldChange = (e) => {
    if (e.target.name === 'location') {
      this.setState({ selectedLocation: e.target });
    }

    if (e.target.name === 'account') {
      this.setState({ selectedAccount: e.target });
    }
    if (e.target.name === 'trainingType') {
      this.setState({ selectedTrainingType: e.target });
    }

    if (e.target.name === 'programManager') {
      this.setState({ selectedProgramManager: e.target });
    }
    
    this.inputFieldChange(e);
  }

  getSteps = () => ['Registration', 'Batch Creation', 'Curriculum'];

  handleStep = (index) => {
    if (index === 1) {
      this.getTrainingList();
    }
    this.setState({ activeStep: index, batchDetailsList: [], eventSelected: null });
  }
  handleNext = () => {
    if (this.state.activeStep + 1 === 1) {
      this.getTrainingList();
    }
    if (this.state.activeStep < 2) {
      this.setState(prev => ({ activeStep: prev.activeStep + 1, batchDetailsList: [], eventSelected: null }));
    }
    if(this.state.activeStep === 2) {
      console.log('---finished---');
    }
  }

  handleBack = () => {
    if (this.state.activeStep - 1 === 1) {
      this.getTrainingList();
    }
    this.setState(prev => ({ activeStep: prev.activeStep - 1, batchDetailsList: [], eventSelected: null }));
  }

  onChangeTraining = (eventSelected) => {
    this.setState({ eventSelected: eventSelected.target, batchDetailsList: [], batchSelected: null, candidateList: [] });
    this.getBatchList(eventSelected.target.value);
  }

  getBatchList = (id) => {
    const reqObj = {
      training_id: id
    };
    this.props.getBatchList(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        this.setState({ batchDetailsList: response.arrRes });
      } else {
        this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
      }
    });
  }

  handleModalClose = () => {
    this.setState({ showAddBatchModal: false, newBatchName: '', newBatchCount: '' })
  }

  addBatch = () => {
    this.setState({ showAddBatchModal: true });

  }

  handleModalSubmit = () => {
    const { newBatchName, eventSelected, newBatchCount } = this.state;
    const reqObj = {
      training_id: eventSelected.value,
      batch_name: newBatchName,
      batch_count: newBatchCount,
      created_by: 1
    }
    this.props.addBatchName(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        this.getBatchList(eventSelected.value);
        this.setState({ showAddBatchModal: false, showToast: true, toastMsg: 'Batch Creation is successful.' })
      } else {
        this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
      }
    });

  }
  render() {
    const { classes } = this.props;
    const { skillList, showAddBatchModal, newBatchName, batchDetailsList, EventDetailsList,
      eventSelected, activeStep, toastMsg, formIsValid, selectedProgramManager, newBatchCount, selectedTrainingType,
      selectedAccount, selectedLocation, locationList, accountList, trainingTypeList, formValues } = this.state;
    const steps = this.getSteps();
    return (
      <Paper className={classes.paperRoot} elevation={3}>
        <Typography variant="h4" className="text-center" gutterBottom>
          Training Registration
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} onClick={() => this.handleStep(index)}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && <Grid container spacing={3} className={classes.gridRoot}>
          <Grid item xs={12} sm={6}>
            <div>
              <Textbox
                value={formValues.trainingName.value}
                fieldLabel="Training Name"
                id="trainingName"
                type="text"
                placeholder="Training Name"
                errorMessage={this.state.errors.trainingName === "" ? null : this.state.errors.trainingName}
                name="trainingName"
                onChange={this.inputFieldChange}
              />
              <SelectOne
                fieldLabel="Training Type"
                id="trainingType"
                name="trainingType"
                placeholder="Training Type"
                value={selectedTrainingType}
                options={trainingTypeList}
                onChange={this.selectFieldChange}
                errorMessage={this.state.errors.location === "" ? null : this.state.errors.location}
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
              <SelectOne
                fieldLabel="Program Manager"
                id="programManager"
                name="programManager"
                placeholder="Program Manager"
                value={selectedProgramManager}
                options={skillList}
                onChange={this.selectFieldChange}
                errorMessage={this.state.errors.programManager === "" ? null : this.state.errors.programManager}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>

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
            <SelectOne
              fieldLabel="Skills"
              id="skills"
              name="skills"
              placeholder="Skills"
              value={formValues.skills && formValues.skills.value}
              isMulti={true}
              options={skillList}
              onChange={this.selectFieldChange}
              errorMessage={this.state.errors.skills === "" ? null : this.state.errors.skills}
            />
            <SelectOne
              fieldLabel="Assign SME"
              id="assignSME"
              name="assignSME"
              placeholder="Assign SME"
              value={formValues.assignSME && formValues.assignSME.value}
              isMulti={true}
              options={skillList}
              onChange={this.selectFieldChange}
              errorMessage={this.state.errors.assignSME === "" ? null : this.state.errors.assignSME}
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
              disabled={formValues.plannedStDate.value === '' || formValues.plannedStDate.value === null}
              minDate={formValues.plannedStDate.value}
              onChange={this.inputFieldChange}
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
              disabled={formValues.actualStDate.value === ''|| formValues.plannedStDate.value === null}
              minDate={formValues.actualStDate.value}
              onChange={this.inputFieldChange}
            />
          </Grid>
        </Grid>}
        {activeStep === 1 && <Grid container spacing={3} className={classes.gridRoot}>
          <Grid item xs={12} sm={4}>
            <SelectOne
              fieldLabel="Training List"
              value={eventSelected}
              name="trainingList"
              onChange={this.onChangeTraining}
              options={EventDetailsList}
              defaultValue={eventSelected}
              placeholder="Select Training"
              aria-label="training"
              aria-describedby="training"
              id="training"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" disabled={eventSelected === '' || eventSelected === null} className={classes.addBtn} onClick={this.addBatch} color="primary">
              Add
          </Button>
          </Grid>
        </Grid>}

        {batchDetailsList.length > 0 &&
          <Fragment>
            <Typography variant="h6" className={classes.batchTitle}>
              Batch List:
            </Typography>
            <List className={classes.listRoot}>
              {batchDetailsList.map(batch =>
                <Fragment>
                  <ListItem>
                    <ListItemText primary={`Name: ${batch.batch_name}`}
                      secondary={
                        <Typography component="span" color="textPrimary">
                          Count: {batch.batch_count}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </Fragment>
              )}
            </List>
          </Fragment>
        }
        {activeStep === 2 && <div>Curriculum</div>}
        <Dialog
          disableBackdropClick
          maxWidth="xs"
          fullWidth={true}
          open={showAddBatchModal}
          onClose={this.handleModalClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add new Batch</DialogTitle>
          <DialogContent >
            <div style={{ display: 'flex' }}>
              <Typography style={{ padding: '15px 15px 10px 0' }}>Batch Name:</Typography>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                placeholder="Batch Name"
                type="text"
                value={newBatchName}
                onChange={(e) => this.setState({ newBatchName: e.target.value })}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <Typography style={{ padding: '15px 15px 10px 0' }}>Batch Count:</Typography>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                placeholder="Batch Count"
                type="number"
                value={newBatchCount}
                onChange={(e) => this.setState({ newBatchCount: e.target.value })}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModalClose} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleModalSubmit} disabled={newBatchName === '' || newBatchCount === ''} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.bottomBtn}>
          <Button
            disabled={activeStep === 0}
            onClick={this.handleBack}
            className={classes.backButton}
          >Back</Button>
          <Button variant="contained" color="primary" onClick={this.handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles, { withTheme: true })(TrainingCreation);
