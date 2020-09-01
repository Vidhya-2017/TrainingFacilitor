import React, { Fragment } from 'react';
import moment from 'moment';
import {
  Paper, Stepper, Dialog, Slide, IconButton, Grid, Step, Button, Typography,
  StepLabel, withStyles, AppBar, Toolbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import HomeContainer from '../../Home/container/HomeContainer';
import CandidateRegistration from './CandidateRegistration';
import Curriculum from './Curriculum';
import BatchFormation from './BatchFormation';
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const trainingRegForm = {
  trainingName: { ...inputField },
  trainingType: { ...inputField },
  duration: { ...inputField },
  location: { ...inputField },
  account: { ...inputField },
  count: { ...inputField },
  skills: { ...inputField },
  assignSME: { ...inputField },
  programManager: { ...inputField },
  programManagerSapid: { ...inputField },
  requestBy: { ...inputField },
  requestBySapid: { ...inputField },
  plannedEndDate: { ...inputField },
  plannedStDate: { ...inputField },
  actualEndDate: { ...inputField },
  actualStDate: { ...inputField },
}

const styles = (theme) => ({
  paperRoot: {
    width: '80%',
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
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

class TrainingCreation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 3,
      errors: {},
      formValues: { ...trainingRegForm },
      showToast: false,
      toastMsg: '',
      skillList: [],
      smesList: [],
      locationList: [],
      accountList: [],
      selectedSkill: [],
      selectedSME: [],
      EventDetailsList: [],
      trainingTypeList: [],
      eventSelected: null,
      selectedAccount: null,
      selectedTrainingType: null,
      selectedProgramManager: null,
      selectedlocation: null,
      batchDetailsList: [],
      formIsValid: false,
      newBatchName: '',
      newBatchCount: '',
      showCandidateUpload: false,
      CRFormIsValid: false,
      batchSelected: null,
      smesListOption: [],
    }
    this.candidateRegRef = React.createRef();
    this.batchFormationRef = React.createRef();
    this.curriculumRef = React.createRef();
  }

  componentDidMount() {
    this.getSkillList();
    this.getLocation();
    this.getAccount();
    this.getTrainingType();
    this.getSmesList();
  }
  getAccount = () => {
    this.props.getAccount().then(response => {
      if (response && response.errCode === 200) {
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
      if (response && response.errCode === 200) {
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
      if (response && response.errCode === 200) {
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
      if (response && response.errCode === 200) {
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
  getSmesList = () => {
    this.props.getSmeList().then(response => {
      if (response && response.errCode === 200) {
        const smesList = response.arrRes.map(list => {
          return {
            value: list.id,
            id: list.id,
            label: list.name,
            skill: list.SkillName,
            skillsId: list.skill_ids
          }
        });
        console.log(smesList);
        this.setState({ smesList });
      } else {
        this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
      }
    })
  }

  getTrainingList = () => {
    this.props.getTrainingList().then((response) => {
      if (response && response.errCode === 200) {
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
      skills: formData.skills,
      smeIds: formData.assignSME,
      programManager: formData.programManager,
      programManagerSapid: formData.programManagerSapid,
      requestBy: formData.requestBy,
      requestBySapid: formData.requestBySapid,
      CreatedBy: 1,
      UpdatedBy: 1
    }
    this.props.registerTraining(reqObj).then(result => {
      this.setState({
        formValues: { ...trainingRegForm }, selectedAccount: null, selectedTrainingType: null, selectedLocation: null,
        selectedSkill: null, selectedSME: null
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
    if (e.target.name === 'skills') {
      this.setState({ smesListOption: [] }, () => {
        const { smesList } = this.state;
        const TemSme = [];
        const onchangeSkill = e.target.value;
        smesList.forEach((list, index) => {
          const Indexkill = list.skillsId.filter(element => onchangeSkill.includes(element));
          if (Indexkill.length > 0) {
            TemSme.push({
              value: list.id,
              id: list.id,
              label: list.label.concat("-").concat(list.skill)
            });
          }
        });
        this.setState({ smesListOption: TemSme });
      });
    }

    this.inputFieldChange(e);
  }

  getSteps = () => ['Registration', 'Candidate Registration', 'Batch Creation', 'Curriculum'];

  handleStep = (index) => {
    this.setState({ activeStep: index, batchDetailsList: [], eventSelected: null });
  }

  handleNext = async () => {
    if (this.state.activeStep === 0) {
      this.submitForm();
    } else if (this.state.activeStep === 1) {
      await this.candidateRegRef.current.submitForm().then(res => {
        if (res === 200) {
          this.setState(prev => ({ activeStep: prev.activeStep + 1, CRFormIsValid: false, batchDetailsList: [], eventSelected: null }));
        }
      });
    } else if (this.state.activeStep === 2) {
      await this.batchFormationRef.current.insertCandidates().then(res => {
        if (res === 200) {
          this.setState(prev => ({ activeStep: prev.activeStep + 1, CRFormIsValid: false, batchDetailsList: [], eventSelected: null }));
        }
      });
    } else if (this.state.activeStep < 3) {
      console.log('-isFormSubmittedSuccess-again-');
      this.setState(prev => ({ activeStep: prev.activeStep + 1, CRFormIsValid: false, batchDetailsList: [], eventSelected: null }));
    }
  }

  handleBack = async () => {
    this.setState(prev => ({ activeStep: prev.activeStep - 1, CRFormIsValid: false, batchDetailsList: [], eventSelected: null }));
  }

  onChangeTraining = (eventSelected) => {
    this.setState({ eventSelected: eventSelected.target, batchDetailsList: [], batchSelected: null, candidateList: [] });
    this.getBatchList(eventSelected.target.value);
  }

  getBatchList = (id) => {
    const reqObj = { training_id: id };
    this.props.getBatchList(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        const batchDetailsList = response.arrRes.map(list => {
          return {
            value: list.batch_id,
            label: `${list.batch_name}: Count - ${list.batch_count}`,
            trID: list.training_id
          }
        })
        this.setState({ batchDetailsList });
      } else {
        this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
      }
    });
  }

  showCandidateUpload = () => {
    this.setState({ showCandidateUpload: true });
  }

  handleCandidateUploadClose = () => {
    this.setState({ showCandidateUpload: false });
  }

  onBatchChange = (batchSelected) => {
    this.setState({ batchSelected: batchSelected.target })
  }

  checkAllFieldsValid = (CRFormIsValid) => {
    this.setState({ CRFormIsValid })
  }

  render() {
    const { classes } = this.props;
    const { skillList, showAddBatchModal, newBatchName, batchSelected, batchDetailsList, EventDetailsList,
      eventSelected, activeStep, showCandidateUpload, CRFormIsValid, selectedProgramManager, newBatchCount, selectedTrainingType,
      selectedAccount, selectedLocation, locationList, accountList, trainingTypeList, formValues, smesList, smesListOption } = this.state;
    const steps = this.getSteps();
    let disableSubmitBtn = false;
    if (activeStep === 1) {
      disableSubmitBtn = !CRFormIsValid;
    }
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
                fieldLabel="Candidates Count"
                value={formValues.count.value}
                id="count"
                type="number"
                placeholder="Count"
                errorMessage={this.state.errors.count === "" ? null : this.state.errors.count}
                name="count"
                onChange={this.inputFieldChange}
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
                fieldLabel="Requested By Sapid"
                value={formValues.requestBySapid.value}
                id="requestBySapid"
                type="text"
                placeholder="Requested By Sapid"
                errorMessage={this.state.errors.requestBySapid === "" ? null : this.state.errors.requestBySapid}
                name="requestBySapid"
                onChange={this.inputFieldChange}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Textbox
              fieldLabel="Program Manager"
              id="programManager"
              name="programManager"
              type="text"
              placeholder="Program Manager"
              value={formValues.programManager.value}
              onChange={this.inputFieldChange}
              errorMessage={this.state.errors.programManager === "" ? null : this.state.errors.programManager}
            />
            <Textbox
              fieldLabel="program Manager Sapid"
              value={formValues.programManagerSapid.value}
              id="programManagerSapid"
              type="text"
              placeholder="program Manager Sapid"
              errorMessage={this.state.errors.programManagerSapid === "" ? null : this.state.errors.programManagerSapid}
              name="programManagerSapid"
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
              options={smesListOption}
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
              disabled={formValues.actualStDate.value === '' || formValues.plannedStDate.value === null}
              minDate={formValues.actualStDate.value}
              onChange={this.inputFieldChange}
            />
          </Grid>
        </Grid>}
        {activeStep === 1 &&
          <Fragment>
            <div style={{ float: 'right' }}><Button variant="contained" onClick={this.showCandidateUpload} color="primary">Candidate Upload</Button></div>
            <Dialog fullScreen open={showCandidateUpload} onClose={this.handleCandidateUploadClose} TransitionComponent={Transition}>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton edge="start" color="inherit" onClick={this.handleCandidateUploadClose} aria-label="close">
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>Candidate Upload</Typography>
                </Toolbar>
              </AppBar>
              <HomeContainer />
            </Dialog>
            <CandidateRegistration
              ref={this.candidateRegRef}
              getTrainingList={this.props.getTrainingList}
              getAccount={this.props.getAccount}
              getLobList={this.props.getLobList}
              getLocation={this.props.getLocation}
              insertCandidate={this.props.insertCandidate}
              checkAllFieldsValid={this.checkAllFieldsValid}
            />
          </Fragment>
        }
        {activeStep === 2 && <Grid container spacing={3} className={classes.gridRoot}>
          <BatchFormation
            getTrainingList={this.props.getTrainingList}
            getBatchList={this.props.getBatchList}
            addBatchName={this.props.addBatchName}
            getCandidateMapList={this.props.getCandidateMapList}
            insertCandidateBatchMap={this.props.insertCandidateBatchMap}
            ref={this.batchFormationRef}
          />
        </Grid>}

        {activeStep === 3 &&

        <Grid container spacing={3} className={classes.gridRoot}>
          <Curriculum
            ref={this.curriculumRef}
            getTrainingList={this.props.getTrainingList}
          />
        </Grid>
        }
      <div className={classes.bottomBtn}>
        <Button
          disabled={activeStep === 0}
          onClick={this.handleBack}
          className={classes.backButton}
        >Back</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNext}
          disabled={disableSubmitBtn}>
            Submit
          </Button>
        </div >
      </Paper >
    )
  }
}

export default withStyles(styles, { withTheme: true })(TrainingCreation);
