import React from 'react';
import MaterialTable from "material-table";
import {
  Paper, withStyles, Typography, Button } from '@material-ui/core';
import moment from 'moment';
import SnackBar from '../../../components/UI_Component/SnackBar/SnackBar';
import '../scss/TRCandidateFeedback.scss';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Textbox from '../../../components/UI_Component/Textbox/Textbox';
import DateTimePicker from '../../../components/UI_Component/DateTimePicker/DateTimePicker';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const styles = (theme) => ({
  formControl: {
    margin: '0 8px 8px',
    minWidth: 200,
  },
  formControlPercentage: {
    margin: '0 8px 8px',
    minWidth: 50,
  },
  formControlFinalAssessment: {
    margin: '0 8px 8px',
    minWidth: 70,
  },
  selectEmpty: {
  },
  iconRoot: {
    color: '#6b6b6b'
  },
  paperRoot: {

    width: '90%',
    margin: '20px auto',
    padding: '10px 20px'
  },
  tableheader:{
    backgroundColor: '#9de6e6'
  },
  stickyColumnHeader: { position: 'sticky', left: 0, zIndex: 1, background: '#9de6e6' },
  stickyColumnHeaderName: { position: 'sticky', left: 46, zIndex: 1, background: '#9de6e6' },
  stickyColumnCell: { position: 'sticky', left: 0, zIndex: 1, background: '#9de6e6' },
  stickyColumnCellName: { position: 'sticky', left: 0, zIndex: 1, background: '#fff' },
  select : {padding: '11px 12px'},
  margin: {
    margin: theme.spacing(1)
  },
  selectRoot: {
    width: 60
  }
});



class TrainingFeedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      snackvariant: '',
      updated_by: '',
      snackmsg: '',
      default_date:false,
    }
   
  }

  componentDidMount() {
    
    if(this.props.location.state === undefined || this.props.location.state === ''){
      this.props.history.push('/candidateFeedbackList')
    } else {
      const users = this.props.location.state.data;
      this.setState({ data: users })
    }
  
  }

  onCloseSnackBar = () => {
    this.setState({ snackBarOpen: false });
  }

  onRatingChange = (e, list) => {
    const { data } = this.state;
    list.value = e.target.value;

    const findIndex = data.findIndex(user =>
      list.id === user.id);
      console.log(findIndex);
   
    const updatedUserData = [...data];
    updatedUserData[findIndex][e.target.name] = e.target.value;
    this.setState({ data: updatedUserData }); 
  }

  inputFieldChange = (e, list) => {
    const { data } = this.state;
    list.value = e.target.value;
    
    if(e.target.name === 'assessment' || e.target.name === 'percentage_complete' || e.target.name === 'final_assessment_score'){
      if(e.target.value > 100 || e.target.value < 0 ||  e.target.value === 'e'){
        e.target.value = 0;
      }
    }

    const findIndex = data.findIndex(user =>
      list.id === user.id);

    const updatedUserData = [...data];
    updatedUserData[findIndex][e.target.name] = e.target.value;
    this.setState({ data: updatedUserData }); 
  }

  submitForm = (e) => {

    const { data } = this.state;
    let error = 0;
    data.forEach(element => {
      console.log(element);
      if(element.attendance === 0 || element.sme_session_interaction === 0 || element.theory === 0 || element.hands_on === 0 || element.hands_on_performance === 0 || element.assessment_schedule_compliance === 0 || element.overall === 0 || element.sme_interaction === 0 || element.assessment === 0 || element.percentage_complete === 0 || element.sme_name === '' || element.remarks === '' || element.final_assessment_score === '' || element.spoc === ''  )
      {
        error=error + 1;
        
      }

      if(element.default_end_date === false)
      {
        if(element.training_completed_date === '')
        {
          error=error + 1;
        }
      }

      if(element.training_completed_date !== '' ){
        element.training_completed_date=moment(element.training_completed_date).format("YYYY-MM-DD");
      }
       
    });

    if(error === 0) {

    let reqObj = {
      data: this.state.data,
      created_by: 1,
    }
    

    this.props.insertCandidateFeedback(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        this.setState({
          snackvariant: 'success',
          snackBarOpen: true,
          snackmsg: "Candidates Feedback Added Successfully"
        })
        
          this.props.history.push('/candidateFeedbackList');
       
        
      } else {
        this.setState({
          snackvariant: 'error',
          snackBarOpen: true,
          snackmsg: "Error in Loading Data"
        })
        
          this.props.history.push('/candidateFeedbackList');
       
      }
    })
  } else {
    this.setState({
      snackvariant: 'error',
      snackBarOpen: true,
      snackmsg: "Plaese fill all values"
    })
  
  }
  
  }

  CancelAction = () =>{
    this.props.history.push('/candidateFeedbackList')
  }

  handleChange = (e, list) => {

  const { data } = this.state;

    const findIndex = data.findIndex(user =>
      list.id === user.id);

    const updatedUserData = [...data];
  
    updatedUserData[findIndex]['default_end_date'] = !updatedUserData[findIndex]['default_end_date'];

    this.setState({ data: updatedUserData });
    
  };

  render() {
    const { data, snackvariant, snackBarOpen, snackmsg } = this.state;
    const { classes } = this.props;
console.log(data);
    return (
      <div className="TRCandidateFeedback_container">

        <Paper className={classes.paperRoot} elevation={3}>
          <Typography variant="h4" className="text-center" gutterBottom>
            Candidate Feedback
            </Typography>
            <Typography variant="h6" className="text-left" gutterBottom>
            SME Name: {data.length > 0 ? data[0].sme_name : '-'}

            </Typography>
            <Typography variant="h6" className="text-left" gutterBottom>
            SPOC: {data.length > 0 ? data[0].spoc : '-'}

            </Typography>
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableheader} >
          <TableRow>
            <TableCell className={classes.stickyColumnCell}>Name</TableCell>
            <TableCell >Attendance</TableCell>
            <TableCell >SME session Interaction</TableCell>
            <TableCell >Theory</TableCell>
            <TableCell >Hands-on</TableCell>
            <TableCell >Hands-on Performance</TableCell>
            <TableCell >Assessment %</TableCell>
            <TableCell >Assessment Schedule Compliance</TableCell>
            <TableCell >Overall</TableCell>
            <TableCell >SME's Interaction</TableCell>
           {/*  <TableCell >SME Name</TableCell> */}
            <TableCell >Remarks</TableCell>
            <TableCell >Training Completed</TableCell>
            <TableCell >Training Complete Date</TableCell>
            <TableCell >Certification</TableCell>
            <TableCell >Final Score</TableCell>
            <TableCell >% complete</TableCell>
            {/* <TableCell >SPOC</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" className={classes.stickyColumnCellName}>
                {row.first_name}
              </TableCell>
              <TableCell >
              <FormControl className={classes.margin}>
              <Select
                name="attendance"
                id="attendance"
                value={row.attendance}
                onChange={(e) => this.onRatingChange(e, row)}
                variant="outlined"
                input={<BootstrapInput />}
              >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={3}>4</MenuItem>
                  <MenuItem value={3}>5</MenuItem>
                </Select>
                </FormControl>
              </TableCell>
              <TableCell >
                <Select
                  name="sme_session_interaction"
                  id="sme_session_interaction"
                  value={row.sme_session_interaction}
                  onChange={(e) => this.onRatingChange(e, row)}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </TableCell>
              <TableCell >
                {" "}
                <Select
                  name="theory"
                  id="theory"
                  value={row.theory}
                  onChange={(e) => this.onRatingChange(e, row)}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </TableCell>
              <TableCell >
                {" "}
                <Select
                  name="hands_on"
                  id="hands_on"
                  value={row.hands_on}
                  onChange={(e) => this.onRatingChange(e, row)}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </TableCell>
              <TableCell >
                {" "}
                <Select
                  name="hands_on_performance"
                  id="hands_on_performance"
                  value={row.hands_on_performance}
                  onChange={(e) => this.onRatingChange(e, row)}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </TableCell>
              <TableCell >
                {" "}
                <FormControl variant="outlined" className={classes.formControlFinalAssessment}>
                <Textbox
                  value={row.assessment}
                  id="assessment"
                  type="tel"
                  placeholder="Assessment %"
                  name="assessment"
                  onChange={(e) => this.inputFieldChange(e, row)}
                  input={<BootstrapInput />}
                />
                </FormControl>
              </TableCell>
              <TableCell >
                {" "}
                <Select
                  name="assessment_schedule_compliance"
                  id="assessment_schedule_compliance"
                  value={row.assessment_schedule_compliance}
                  onChange={(e) => this.onRatingChange(e, row)}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </TableCell>
              <TableCell >
                {" "}
                <Select
                  name="overall"
                  id="overall"
                  value={row.overall}
                  onChange={(e) => this.onRatingChange(e, row)}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </TableCell>
              <TableCell >
                {" "}
                <Select
                  name="sme_interaction"
                  id="sme_interaction"
                  value={row.sme_interaction}
                  onChange={(e) => this.onRatingChange(e, row)}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </TableCell>
             {/*  <TableCell >
                {" "}
                <FormControl variant="outlined" className={classes.formControl}>
                <Textbox
                  value={row.sme_name}
                  id="sme_name"
                  type="text"
                  placeholder="SME Name"
                  name="sme_name"
                  onChange={(e) => this.inputFieldChange(e, row)}

                />
                </FormControl>
              </TableCell> */}
              <TableCell >
                {" "}
                <FormControl variant="outlined" className={classes.formControl}>
                <Textbox
                  value={row.remarks}
                  id="remarks"
                  type="text"
                  placeholder="Remarks"
                  name="remarks"
                  onChange={(e) => this.inputFieldChange(e, row)}
                  input={<BootstrapInput />}
                />
                </FormControl>
              </TableCell>
              <TableCell >
                {" "}
                <Select
                  name="training_completed"
                  id="training_completed"
                  value={row.training_completed}
                  onChange={(e) => this.onRatingChange(e, row)}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={'Yes'}>Yes</MenuItem>
                  <MenuItem value={'No'}>No</MenuItem>
                </Select>
              </TableCell>
              <TableCell >
                {" "}
                <Checkbox
                  checked={row.default_end_date}
                  name="default_date"
                  onChange={(e) => this.handleChange(e, row)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                { row.default_end_date === true &&
                <DateTimePicker
                  value={row.actual_training_completed_date}
                  maxDays={90}
                  minDate={new Date()}
                  disabled = {true}
                  name="actual_training_completed_date"
                  onChange={(e) => this.inputFieldChange(e, row)}
                  input={<BootstrapInput />}
                />
                }
                { row.default_end_date === false &&
                <DateTimePicker
                  value={row.training_completed_date}
                  maxDays={90}
                  minDate={new Date()}
                  name="training_completed_date"
                  onChange={(e) => this.inputFieldChange(e, row)}
                  input={<BootstrapInput />}
                />
                }
              </TableCell>  
              <TableCell >
                {" "}
                <Select
                  name="certification"
                  id="certification"
                  value={row.certification}
                  onChange={(e) => this.onRatingChange(e, row)}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={'Foundation'}>Foundation</MenuItem>
                  <MenuItem value={'Associate'}>Associate</MenuItem>
                </Select>
              </TableCell>  
              <TableCell >
                {" "}
                <FormControl variant="outlined" className={classes.formControlFinalAssessment}>
                <Textbox
                  value={row.final_assessment_score}
                  id="final_assessment_score"
                  type="tel"
                  placeholder="Final Assessment Score"
                  name="final_assessment_score"
                  onChange={(e) => this.inputFieldChange(e, row)}
                  input={<BootstrapInput />}
                />
                 </FormControl>
              </TableCell>
              <TableCell >
                {" "}
                <FormControl variant="outlined" className={classes.formControlFinalAssessment}>
                <Textbox
                  value={row.percentage_complete}
                  id="percentage_complete"
                  type="tel"
                  placeholder="% Complete"
                  name="percentage_complete"
                  onChange={(e) => this.inputFieldChange(e, row)}
                  input={<BootstrapInput />}
                />
                </FormControl>
              </TableCell>
              {/* <TableCell >
                {" "}
                <FormControl variant="outlined" className={classes.formControl}>
                <Textbox
                  value={row.spoc}
                  id="spoc"
                  type="text"
                  placeholder="SPOC"
                  name="spoc"
                  onChange={(e) => this.inputFieldChange(e, row)}

                />
                </FormControl>
              </TableCell>  */}   
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      
                    
    </TableContainer>
    <Button variant="contained" onClick={this.submitForm} color="primary">Submit</Button>
    <Button variant="contained" onClick={this.CancelAction}>Cancel</Button>

          {snackBarOpen &&
            <SnackBar onCloseSnackBar={this.onCloseSnackBar} snackBarOpen={snackBarOpen} snackmsg={snackmsg} snackvariant={snackvariant} />}
        </Paper>
      </div >
    )
  }
}


export default withStyles(styles, { withTheme: true })(TrainingFeedback);