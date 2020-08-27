import React, { Component } from 'react'
import { Paper, Typography, List, Grid, ListItem, ListItemIcon, Checkbox, ListItemText, IconButton, withStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';
// import '../scss/BatchFormation.scss'

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
    width: "100%",
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
  listRoot: {
    width: '100%',
    maxWidth: 360,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  cardHeader: {
    padding: theme.spacing(1, 2),

  },
  list: {
    /*  width: 200, */
    height: 300,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(1, 1),
    justify: "right",
  },
  bottomBtn: {
    justifyContent: 'flex-end',
    display: 'flex',
    marginTop: 10
  },
  selectOne: {
    display: 'flex',
  },
  trainingTitle: {
    padding: "15px 10px"
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


class BatchFormation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      trainingList: [],
      selectedTraining: null,
      checked: [],
      newChecked: [],
      candidatesList: [],
      batchDetailsList: [],
      snackbaropen: false,
      snackmsg: '',
      snackvariant: '',
      query: '',
      selectall: false,
      checked: [],
      left: [],
      right: [],
      batchSelected: null,
    }
    this.candidatesList = [];
  }

  componentDidMount() {
    this.getTrainingList();
  }

  getTrainingList = () => {
    this.props.getTrainingList().then(response => {
      if (response && response.errCode === 200) {
        const trainingList = response.arrRes.map(list => {
          return {
            value: list.id,
            id: list.id,
            label: list.training_name
          }
        });
        this.setState({ trainingList });
      } else {
        this.setState({ snackbaropen: true, snackmsg: 'Something went Wrong. Please try again later', snackvariant: "error" })
      }
    })
  }

  selectTrainingChange = (selectedTraining) => {
    this.setState({ selectedTraining: selectedTraining.target, candidatesList: [], batchSelected: null });
    const reqObj = { training_id: selectedTraining.target.value };
    this.props.getBatchList(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        const batchList = response.arrRes.map(list => {
          return {
            value: list.batch_id,
            label: list.batch_name
          }
        });
        this.setState({ batchDetailsList: batchList, candidatesList: this.candidatesList, selectall: false, left: [], right: [] });
      } else {
        this.setState({ snackbaropen: true, snackmsg: 'Something went Wrong. Please try again later', snackvariant: "error" })
      }
    })
  }

  onChangeBatch = (batchSelected) => {
    this.setState({ batchSelected: batchSelected.target });
    const reqObj = {
      training_id: this.state.selectedTraining.value,
      batch_id: batchSelected.target.value
    }

    this.props.getCandidateMapList(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        this.candidatesList = [...response.batchCandidate, ...response.nonBatchCnadidate];
        this.setState({
          candidatesList: this.candidatesList, selectall: false, left: response.nonBatchCnadidate, right: response.batchCandidate
        });
      } else {
        this.setState({ snackbaropen: true, snackmsg: 'Something went Wrong. Please try again later', snackvariant: "error" })
      }
    });
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
    const { candidatesList, right, batchSelected } = this.state;
    const candidateIDs = [];
    right.forEach((candidate) => {
      if (candidate.id !== '' && candidate.id !== null) {
        candidateIDs.push(candidate.id)
      }
    });
    const user_id = 1;
    if (candidateIDs.length !== 0) {

      const reqObj = {
        batch_id: batchSelected.value,
        candidate_ids: candidateIDs,
        created_by: 1,
      }

      this.props.insertCandidateBatchMap(reqObj).then((response) => {
        if (response && response.errCode === 200) {
          this.setState({ candidatesList: [], selectall: false, batchSelected: null, selectedTraining: null, left: [], right: [], snackbaropen: true, snackmsg: "Candidates Assigned Successfully", snackvariant: "success" });
        } else {
          this.setState({ candidatesList: [], selectall: false, batchSelected: null, selectedTraining: null, left: [], right: [], snackbaropen: true, snackmsg: 'Something went Wrong. Please try again later.', snackvariant: "error" })
        }
      })

    } else {
      this.setState({ snackbaropen: true, snackmsg: 'Please Select Atleast One Candidate.', snackvariant: "error" })
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
      <Card variant="outlined">
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
    const { classes } = this.props;
    const { trainingList, selectedTraining, candidatesList, snackbaropen, snackmsg, snackvariant, query, selectall, checked, left, right, batchSelected, batchDetailsList } = this.state;
    this.leftChecked = this.intersection(checked, left);
    this.rightChecked = this.intersection(checked, right);
    this.CandidateIDs = [];
    candidatesList.forEach(list => {
      if (list.training_id !== null && list.training_id !== '') {
        this.CandidateIDs.push(list.id);
      }
    })

    return (
        <Paper className={classes.paperRoot} elevation={0}>
          {/* <Typography variant="h4" className="text-center" gutterBottom>
            Batch Formation
          </Typography> */}
          <div className={classes.selectOne}>
            <Typography variant="body1" className={classes.trainingTitle}> Training List </Typography >
            <Grid item xs={12} sm={5} md={4}>
              <SelectOne
                fieldLabel=""
                id="training"
                name="training"
                placeholder="Training"
                value={selectedTraining ? selectedTraining : null}
                options={trainingList}
                onChange={this.selectTrainingChange}
                errorMessage={this.state.errors.training === "" ? null : this.state.errors.training}

              />
            </Grid>
            <Typography variant="body1" className={classes.trainingTitle}> Batch list </Typography >
            <Grid item xs={12} sm={5} md={4}>
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
            </Grid>
          </div>

          {selectedTraining && batchSelected &&
            <Grid
              container
              spacing={4}
              justify="center"
              alignItems="center"
              className={classes.gridRoot}
            >
              <Grid item xs={5} sm={5}>{this.customList("Non-Registered", left)}</Grid>
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
              <Grid item xs={5} sm={5}>{this.customList("Registered", right)}</Grid>
            </Grid>

          }

          {/* {selectedTraining && batchSelected &&
            <div className={classes.bottomBtn}>
              <Button variant="contained" color="primary" onClick={this.insertCandidates} >
                Submit
                </Button>
            </div>
          } */}
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
    );
  }
}


export default withStyles(styles)(BatchFormation);