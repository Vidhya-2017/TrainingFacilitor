import React from 'react';
import MaterialTable from "material-table";
import {
  Paper, withStyles, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent,
  Button,
} from '@material-ui/core';
import ToastBox from '../../../components/UI_Component/Toast/ToastBox';

const styles = (theme) => ({
  iconRoot: {
    color: '#6b6b6b'
  },
  paperRoot: {
    width: '70%',
    margin: '20px auto',
    padding: '10px 20px'
  },
});

class DurationMaster extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      durationMaster: '',
      newDurationMaster: '',
      errors: {},
      durationMasterListVal: [],
      showAddDurationMasterModal: false,
      showToast: false,
      toastMsg: ''
    }
    this.columnFields = [
      {
        title: "Duration Master",
        field: "duration",
        validate: rowData => rowData.duration !== '',
      },
    ]
  }

  componentDidMount() {
    this.props.getDurationMasterList().then((response) => {
      console.log(response);
      if (response && response.errCode === 200) {
        this.setState({
          durationMasterListVal: response.arrRes,
          showToast: true,
          toastMsg: "Duration Master Data loaded successfully"
        })
      } else {
        this.setState({
          durationMasterListVal: [],
          showToast: true,
          toastMsg: "Error in loading Duration Master Data"
        })
      }
    });
  }

  handleDelete = (id) => {
    const filteredItems = this.state.durationMasterListVal.filter((item) => item.id !== id);
    const reqObj = {
      id: id,
      updated_by: 1
    }
    this.props.deleteDurationMasterList(reqObj).then(response => {
      if (response && response.errCode === 200) {
        this.setState({
          durationMasterListVal: filteredItems,
          deleteModal: false,
          showToast: true,
          toastMsg: "Duration Master deleted successfully",
        });
      }
      else {
        this.setState({
          durationMaster: '', deleteModal: false,
          showToast: true,
          toastMsg: "Error in Duration Master deletion"
        });
      }
    });
  }

  editSubmit = (newData, oldData) => {
    console.log(this.state.durationMasterListVal);
    const reqObj = {
      id: newData.id,
      duration: newData.duration,
      updated_by: "1"
    }
    this.props.editDurationMasterList(reqObj).then(response => {
      if (response && response.errCode === 200) {
        this.setState(prevState => ({
          durationMasterListVal: prevState.durationMasterListVal.map(
            el => el.id === newData.id ? { ...el, duration: newData.duration } : el
          )
        }))
        this.setState({
          durationMaster: '',
          showToast: true,
          toastMsg: "Duration Master updated successfully",
        });
      }
      else if (response && response.errCode === 404) {
        this.setState({
          durationMaster: '',
          showToast: true,
          toastMsg: " failed in updating Duration Master "
        });
      }
      else {
        this.setState({
          durationMaster: '',
          showToast: true,
          toastMsg: "error in updating Duration Master"
        });
      }
    });
  }

  handleModalClose = () => {
    this.setState({ showAddDurationMasterModal: false, newDurationMaster: '' })
  }

  handleModalSubmit = () => {
    const { newDurationMaster } = this.state;
    const reqObj = {
      duration: newDurationMaster,
      created_by: 1,
      updated_by: 1,
    }
    console.log(reqObj);
    this.props.addDurationMasterList(reqObj).then(response => {
      console.log(response);
      if (response && response.errCode === 200) {
        const myObj = {
          duration: newDurationMaster
        }
        const updatedItems = [...this.state.durationMasterListVal, myObj];
        this.setState({
          newDurationMaster: '',
          add: false,
          showAddDurationMasterModal: false,
          durationMasterListVal: updatedItems,
          showToast: true,
          toastMsg: "Duration Master added successfully!"
        })
      }
      else if (response && response.errCode === 404) {
        this.setState({
          newDurationMaster: '',
          add: false,
          showAddDurationMasterModal: false,
          showToast: true,
          toastMsg: " Duration Master Already exists!"
        })
      }
      else {
        this.setState({
          newDurationMaster: '',
          add: false,
          showAddDurationMasterModal: false,
          showToast: true,
          toastMsg: "Error in adding Duration Master!"
        })
      }
    });
  };

  render() {
    const { durationMasterListVal, showAddDurationMasterModal, newDurationMaster, showToast, toastMsg } = this.state;
    const { classes } = this.props;
    return (
      <div className="DurationMaster_container">
        <Dialog
          disableBackdropClick
          maxWidth="xs"
          fullWidth={true}
          open={showAddDurationMasterModal}
          onClose={this.handleModalClose}
          aria-labelledby="Duration-Master"
        >
          <DialogTitle id="Duration-Master">Add Duration Master</DialogTitle>
          <DialogContent >
            <div style={{ display: 'flex' }}>
              <Typography style={{ padding: '15px 15px 10px 0' }}>Duration Master:</Typography>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                placeholder="Duration Master"
                type="text"
                value={newDurationMaster}
                onChange={(e) => this.setState({ newDurationMaster: e.target.value })}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModalClose} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleModalSubmit} disabled={newDurationMaster === '' || newDurationMaster === null} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Paper className={classes.paperRoot} elevation={3}>
          <Typography variant="h4" className="text-center" gutterBottom>
            Duration Master
        </Typography>
          <MaterialTable
            title=""
            columns={this.columnFields}
            data={durationMasterListVal}
            style={{ boxShadow: 'none', border: 'solid 1px #ccc' }}
            options={{
              actionsColumnIndex: -1,
              pageSizeOptions: []
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Add Duration Master',
                isFreeAction: true,
                onClick: (event) => this.setState({ showAddDurationMasterModal: true })
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
                  this.handleDelete(oldData.id);
                })
            }}
          />
          {
            showToast &&
            <ToastBox showToast={showToast} toastMsg={toastMsg} />
          }
        </Paper>

      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(DurationMaster);