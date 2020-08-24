import React, { Component } from 'react'
import { Paper, List, Grid, ListItem, ListItemIcon, Checkbox, ListItemText,Typography, ListItemSecondaryAction, IconButton, withStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';
import '../scss/CandidateSelection.scss'

import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const styles = (theme) => ({
  paperRoot: {
    margin: theme.spacing(6),
    padding: theme.spacing(4),
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
  listRoot: {
    width: '100%',
    maxWidth: 360,
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
});


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
    marginRight: theme.spacing.unit,
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


class CandidateSelection extends Component{

    constructor(props){
        super(props);
        this.state = {
          errors: {},
          trainingList: [],
          selectedTraining: null,
          checked:[],
          newChecked:[],
          candidatesList:[],
          snackbaropen: false,
          snackmsg:'',
          snackvariant:'',
          query:''
        }
        this.candidatesList = [];
    }

    componentDidMount() {
      this.getTrainingList();
    }
  
    getTrainingList = () => {
      this.props.getTrainingList().then(response => {
        if (response && response.arrRes) {
          const trainingList = response.arrRes.map(list => {
            return {
              value: list.id,
              id: list.id,
              label: list.training_name
            }
          });
          this.setState({ trainingList });
        } 
      })
    }

    selectTrainingChange = (selectedTraining) => {
      this.setState({ selectedTraining: selectedTraining.target,candidatesList: []  });

    
    const reqObj = { training_id: selectedTraining.target.value };
    this.props.getCandidatesByTrainingList(reqObj).then((response) => {
      console.log(response);
      
        if (response.errCode === 200) {
          
          this.candidatesList = [...response.trainingCandidates, ...response.nonTrainingCandidates];
          this.setState({
            candidatesList: this.candidatesList,
          });
        }
      
    })
    }

    handleCandidateSelection = (e, list) => {
     const { candidatesList, selectedTraining } = this.state;
      const candidateIndex = candidatesList && candidatesList.findIndex((lst) => list.id === lst.id);
      const updatedcandidateList = [...candidatesList];
      updatedcandidateList[candidateIndex].training_id = e.target.checked ? selectedTraining.value : '';
      this.setState({
        candidatesList: updatedcandidateList
      }); 
    }


    insertCandidates = () => {
      
      const { candidatesList, selectedTraining } = this.state;
      const candidateIDs = [];
      candidatesList.forEach((candidate) => {
        if (candidate.training_id !== '' && candidate.training_id !== null) {
          candidateIDs.push(candidate.id)
        }
      });
      const user_id = 1;
      const reqObj = {
        trainingId: selectedTraining.value,
        createdby: user_id,
        candidateIDs
      }
      console.log(reqObj);
      this.props.insertCandidates(reqObj).then((response) => {
        if (response && response.errCode === 200) {
          this.setState({ candidatesList: [], selectedTraining: null, snackbaropen: true , snackmsg:"Candidates Assigned Successfully",snackvariant:"success"});
        } else {
          this.setState({ candidatesList: [], selectedTraining: null, snackbaropen: true , snackmsg: 'Something went Wrong. Please try again later.',snackvariant:"error" })
        }
      })
    }

    searchCandidate = (e) => {
      const query = e.target.value;
      const lowerCaseQuery = query.toLowerCase();
      const searchedData = (query
        ? this.candidatesList.filter((list) =>
          list['first_name']
            .toLowerCase()
            .includes(lowerCaseQuery)
        )
        : this.candidatesList);
      this.setState({ candidatesList: searchedData, query });
    }
  
    
    handleClick = () => {
      this.setState({ snackbaropen: true });
    };
  
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({ snackbaropen: false });
    };

    render() {
      const { classes, variant } = this.props;
    const { trainingList, selectedTraining ,candidatesList,snackbaropen,snackmsg,snackvariant,query} = this.state;
console.log(candidatesList);
        return(
          <Grid item xs={12} sm={6}>
          <Paper className={classes.paperRoot} elevation={3}>

            <SelectOne
              fieldLabel="Training"
              id="training"
              name="training"
              placeholder="Training"
              value={selectedTraining ? selectedTraining : null}
              options={trainingList}
              onChange={this.selectTrainingChange}
              errorMessage={this.state.errors.training === "" ? null : this.state.errors.training}
            />
            {this.candidatesList && this.candidatesList.length > 0 && selectedTraining &&
            <div>
            <InputBase className={classes.input} placeholder="Search Candidates" 
                  value={query}
                  onChange={this.searchCandidate} />
           
                  <IconButton className={classes.iconButton} aria-label="Search">
                    <SearchIcon />
                  </IconButton>
                  </div>
                }
{candidatesList && candidatesList.length > 0 && selectedTraining &&
<List className={classes.root}>
      {candidatesList.map(value => {
        return (
          
          <ListItem key={value.id} role={undefined} dense button >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={value.training_id !== null && value.training_id !== ''}
                tabIndex={-1}
                disableRipple
                onChange={(e) => this.handleCandidateSelection(e, value)}
              />
            </ListItemIcon>
            <ListItemText primary={value.first_name} 
            secondary={
                      <Typography component="span" color="textPrimary">
                        {value.email} - {value.sap_id}
                      </Typography>
                    }/>
          </ListItem>
        );
      })}
    </List>
    }
    {candidatesList && candidatesList.length > 0 &&
    <Button variant="contained" color="primary" onClick={this.insertCandidates} >
        Submit
      </Button>      
    }  
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
            </Grid>
        );
    }
}


export default  withStyles(styles)(CandidateSelection);