import React from 'react';
import MaterialTable from "material-table";
import {
  Paper, withStyles, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent,
  Button,IconButton
} from '@material-ui/core';
import '../scss/TrainingType.scss';
import moment from 'moment';


import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);


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
class TrainingType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      trainingtypeListVal: [],
      showTrainingModal: false,
      newTrainingType: '',
      showToast: false,
      toastMessage: '',
      snackbaropen: false,
      snackmsg:'',
      snackvariant:'',
    }
    this.columnFields = [
      {
        title: "Training Type",
        field: "type",
        validate: rowData => rowData.type !== '',
      },
    ]
  }

  componentDidMount() {
    this.props.getTrainingTypeList().then((response) => {
      if (response && response.arrRes) {
        this.setState({
          trainingtypeListVal: response.arrRes
        })
      } else {
        this.setState({
          trainingtypeListVal: [],
          snackbaropen: true , 
          snackmsg:"Error in Loading Training Types",
          snackvariant:"error"
        })
      }
    });
  }

 

  handleModalClose = () => {
    this.setState({ showTrainingModal: false, newTrainingType: '' })
  }

  handleModalSubmit = () => {
    const { newTrainingType } = this.state;
    const date = moment().format("YYYY-MM-DD");
    const reqObj = {
      training_type: newTrainingType,
      created_by: 1,
      updated_by: 1,
      created_date: date
    }
    this.props.addTrainingType(reqObj).then(response => {
      if (response && response.errCode === 200) {
        const myObj = {
          id: response.TrainingTypeID,
          type: response.TrainingTypeName
        }
        const updatedItems = [...this.state.trainingtypeListVal, myObj];
        this.setState({
          showTrainingModal: false,
          newTrainingType : '',
          trainingtypeListVal: updatedItems,
          snackbaropen: true ,
          snackmsg:"Training Type Added Successfully",
          snackvariant:"success"
        })
      }
      else if (response && response.errCode === 404 && response.status === 'Training type exists!') {
        this.setState({
          showTrainingModal: false,
          newTrainingType : '',
          snackbaropen: true ,
          snackmsg:"Training Type Already Exists",
          snackvariant:"error"
        })
      }
      else {
        this.setState({
          showTrainingModal: false,
          newTrainingType : '',
          snackbaropen: true ,
          snackmsg:"Error in Adding Training Type",
          snackvariant:"error"
        })
      }
    });
  };

  editSubmit = (updatedTrainingtype, oldData) => {
    if(oldData.type != updatedTrainingtype.type)
    {
      const reqObj = {
        id: updatedTrainingtype.id,
        training_type: updatedTrainingtype.type,
        updated_by: 1
      }
      this.props.editTrainingType(reqObj).then(response => {
        if (response && response.errCode === 200) {
          const data = [...this.state.trainingtypeListVal];
          data[data.indexOf(oldData)] = updatedTrainingtype;
          this.setState(prevState => ({
            ...prevState, trainingtypeListVal: data, 
            snackbaropen: true ,
            snackmsg:"Training Type Edited Successfully",
            snackvariant:"success"
          }))
        }
        else if (response && response.errCode === 404 && response.status === 'Training type exists!') {
          this.setState({
            snackbaropen: true ,
            snackmsg:"Training Type Already Exists",
            snackvariant:"error"
          })
        }
        else {
          this.setState({
            snackbaropen: true ,
            snackmsg:"Error in Editing Training Type",
            snackvariant:"error"
          });
        }
      });
    }
    
  }

  handleDelete = (oldData) => {
    const reqObj = {
      id: oldData.id,
      updated_by: 1
    }
    this.props.deleteTrainingType(reqObj).then(response => {
      if (response && response.errCode === 200) {
        const data = [...this.state.trainingtypeListVal];
        data.splice(data.indexOf(oldData), 1);
        this.setState({
          trainingtypeListVal: data,
          snackbaropen: true ,
          snackmsg:"Training Type Deleted Successfully",
          snackvariant:"success"
        });
      }
      else {
        this.setState({
          snackbaropen: true ,
          snackmsg:"Error In Deleting Training Type ",
          snackvariant:"error"
        });
      }
    });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbaropen: false });
  };

  render() {
    const { trainingtypeListVal, showTrainingModal, newTrainingType, snackbaropen, snackmsg, snackvariant } = this.state;
    const { classes } = this.props;
    return (
      <div className="TrainingType_container">
        <Dialog
          disableBackdropClick
          maxWidth="xs"
          fullWidth={true}
          open={showTrainingModal}
          onClose={this.handleModalClose}
          aria-labelledby="training-type"
        >
          <DialogTitle id="training-type">Add Training Type</DialogTitle>
          <DialogContent >
            <div style={{ display: 'flex' }}>
              <Typography style={{ padding: '15px 15px 10px 0' }}>Training Type:</Typography>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                placeholder="Training Type"
                type="text"
                value={newTrainingType}
                onChange={(e) => this.setState({ newTrainingType: e.target.value })}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleModalClose} variant="contained" color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleModalSubmit} disabled={newTrainingType === '' || newTrainingType === null} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Paper className={classes.paperRoot} elevation={3}>
          <Typography variant="h4" className="text-center" gutterBottom>
            Training Type
        </Typography>
          <MaterialTable
            title=""
            columns={this.columnFields}
            data={trainingtypeListVal}
            style={{ boxShadow: 'none', border: 'solid 1px #ccc' }}
            options={{
              actionsColumnIndex: -1,
              pageSizeOptions: []
            }}
            /* actions={[
              {
                icon: 'add',
                tooltip: 'Add Training Type',
                isFreeAction: true,
                disabled : true,
                onClick: (event) => this.setState({ showTrainingModal: true })
              },
            ]} */
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
          <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={snackbaropen}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={snackvariant}
            message={snackmsg}
          />
        </Snackbar>
        </Paper>
      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(TrainingType);