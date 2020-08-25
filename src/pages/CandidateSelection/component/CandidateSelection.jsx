import React, { Component } from 'react'
import { Paper, List, Grid, ListItem, ListItemIcon, Checkbox, ListItemText,IconButton, withStyles } from '@material-ui/core';
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


import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

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
  cardHeader: {
    padding: theme.spacing(1, 2)
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
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
          query:'',
          selectall: false,
          checked: [],
          left: [],
          right: []
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
     
        if (response.errCode === 200) {
          
          this.candidatesList = [...response.trainingCandidates, ...response.nonTrainingCandidates];
          this.setState({
            candidatesList: this.candidatesList,selectall:false,left:response.nonTrainingCandidates,right:response.trainingCandidates
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
      
      const { candidatesList,right, selectedTraining } = this.state;

      const candidateIDs = [];
      right.forEach((candidate) => {
        if (candidate.id !== '' && candidate.id !== null) {
          candidateIDs.push(candidate.id)
        }
      });
      
      const user_id = 1;

      if(candidateIDs.length!=0){

        const reqObj = {
          trainingId: selectedTraining.value,
          createdby: user_id,
          candidateIDs
        }
        console.log(reqObj);
        this.props.insertCandidates(reqObj).then((response) => {
          if (response && response.errCode === 200) {
            this.setState({ candidatesList: [],selectall:false, selectedTraining: null,left:[],right:[], snackbaropen: true , snackmsg:"Candidates Assigned Successfully",snackvariant:"success"});
          } else {
            this.setState({ candidatesList: [],selectall:false, selectedTraining: null,left:[],right:[], snackbaropen: true , snackmsg: 'Something went Wrong. Please try again later.',snackvariant:"error" })
          }
        })
      } else {
        this.setState({ snackbaropen: true , snackmsg: 'Please Select Atleast One Candidate.',snackvariant:"error"})
      }
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


    not = (a, b) => {
      return a.filter((value) => b.indexOf(value) === -1);
    };
  
    intersection = (a, b) => {
      return a.filter((value) => b.indexOf(value) !== -1);
    };
  
    union = (a, b) => {
      return [...a, ...this.not(b, a)];
    };
  
    numberOfChecked = (items) =>
      this.intersection(this.state.checked, items).length;
  
    handleToggle = (value) => () => {
      const currentIndex = this.state.checked.indexOf(value);
      const newChecked = [...this.state.checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      this.setState({
        checked: newChecked
      });
    };
  
    handleToggleAll = (items) => () => {
      if (this.numberOfChecked(items) === items.length) {
        // setChecked();
        this.setState({
          checked: this.not(this.state.checked, items)
        });
      } else {
        this.setState({
          checked: this.union(this.state.checked, items)
        });
      }
    };
  
    handleCheckedRight = () => {
    
      this.leftChecked[0].training_id = this.state.selectedTraining.value;
      this.setState({
        right: this.state.right.concat(this.leftChecked),
        left: this.not(this.state.left, this.leftChecked),
        checked: this.not(this.state.checked, this.leftChecked)
      });
    };
  
    handleCheckedLeft = () => {
      this.setState({
        left: this.state.left.concat(this.rightChecked),
        right: this.not(this.state.right, this.rightChecked),
        checked: this.not(this.state.checked, this.rightChecked)
      });
    };
  
    customList = (title, items) => {
      const { classes } = this.props;
      const { checked } = this.state;
     
      return (
        <Card>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              <Checkbox
                onClick={this.handleToggleAll(items)}
                checked={
                  this.numberOfChecked(items) === items.length &&
                  items.length !== 0
                }
                indeterminate={
                  this.numberOfChecked(items) !== items.length &&
                  this.numberOfChecked(items) !== 0
                }
                disabled={items.length === 0}
                inputProps={{ "aria-label": "all items selected" }}
              />
            }
            title={title}
            subheader={`Count: ${items.length} `}
          />
          <Divider />
          <List className={classes.list} dense component="div" role="list">
            {items.map((value) => {
              const labelId = `transfer-list-all-item-${value}-label`;
  
              return (
                <ListItem
                  key={value.id}
                  role="listitem"
                  button
                  onClick={this.handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.first_name} />
                </ListItem>
              );
            })}
            <ListItem />
          </List>
        </Card>
      );
    };

    render() {
      const { classes, variant } = this.props;
    const { trainingList, selectedTraining ,candidatesList,snackbaropen,snackmsg,snackvariant,query,selectall,checked, left, right} = this.state;

    this.leftChecked = this.intersection(checked, left);
    this.rightChecked = this.intersection(checked, right);
    
    console.log(left);
    console.log(right);

    this.CandidateIDs = [];
    candidatesList.forEach(list => {
      if (list.training_id !== null && list.training_id !== '') {
        this.CandidateIDs.push(list.id);
      }
    })


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
       
       
{ selectedTraining && 
 <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{this.customList("Non-Registered", left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={this.handleCheckedRight}
              disabled={this.leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              variant="outlined"
              size="small"
              className={classes.button}
              onClick={this.handleCheckedLeft}
              disabled={this.rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{this.customList("Registered", right)}</Grid>
      </Grid>
      
    }

    {selectedTraining &&
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