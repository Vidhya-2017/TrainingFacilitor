import React from 'react';
import MaterialTable from "material-table";
import {
  Paper, withStyles, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent, Button
} from '@material-ui/core';
import '../scss/AssesmentType.scss';
import moment from 'moment';

const styles = (theme) => ({
  iconRoot: {
    color: '#6b6b6b'
  },
  paperRoot: {
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('md')]: {
      width: '55%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '45%',
    },
    margin: '20px auto',
    padding: '10px 20px'
  },
});
class AssesmentType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assessmentListVal: [],
      showAddAssessmentModal: false,
      newAssessmentScale: '',
      showToast: false,
      toastMessage: ''
    }
    this.columnFields = [
      {
        title: "Name",
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

  handleDelete = (oldData) => {
    const reqObj = {
      id: oldData.id,
      updated_by: 1
    }
    this.props.DeleteAssesmentTypeList(reqObj).then(response => {
      if (response && response.errCode === 200) {
        const data = [...this.state.assessmentListVal];
        data.splice(data.indexOf(oldData), 1);
        this.setState({
          assessmentListVal: data,
          showToast: true,
          toastMessage: "Assessment name deleted successfully",
        });
      }
      else {
        this.setState({
          showToast: true,
          toastMessage: "Error in Assessment name deletion"
        });
      }
    });
  }

  editSubmit = (updatedScale, oldData) => {
    const reqObj = {
      id: updatedScale.id,
      assesment_type_name: updatedScale.assesment_type_name,
      updated_by: updatedScale.updated_by
    }
    this.props.EditAssesmentTypeList(reqObj).then(response => {
      if (response && response.errCode === 200) {
        const data = [...this.state.assessmentListVal];
        data[data.indexOf(oldData)] = updatedScale;
        this.setState(prevState => ({
          ...prevState, assessmentListVal: data, colsassessmentType: '',
          showToast: true,
          toastMessage: "Assessment name updated successfully",
        }))
      }
      else if (response && response.errCode === 404) {
        this.setState({
          showToast: true,
          toastMessage: " failed in updating Assessment name"
        });
      }
      else {
        this.setState({
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
          showAddAssessmentModal: false,
          assessmentListVal: updatedItems,
          showToast: true,
          toastMessage: "Assessment name added successfully!"
        })
      }
      else if (response && response.errCode === 404) {
        this.setState({
          showAddAssessmentModal: false,
          showToast: true,
          toastMessage: "Already Assessment type name exists!"
        })
      }
      else {
        this.setState({
          showAddAssessmentModal: false,
          showToast: true,
          toastMessage: "error in adding aseessment name!"
        })
      }
    });
  };

  render() {
    const { assessmentListVal, showAddAssessmentModal, newAssessmentScale, showToast, toastMessage } = this.state;
    const { classes } = this.props;
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
            style={{ boxShadow: 'none', border: 'solid 1px #ccc' }}
            options={{
              actionsColumnIndex: -1,
              pageSizeOptions: []
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add Assessment Type',
                isFreeAction: true,
                onClick: (event) => this.setState({ showAddAssessmentModal: true })
              },
            ]}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  resolve();
                  if (oldData) {
                    this.editSubmit(newData, oldData);
                  }
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  resolve();
                  this.handleDelete(oldData);
                })
            }}
          />
        </Paper>
      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(AssesmentType);