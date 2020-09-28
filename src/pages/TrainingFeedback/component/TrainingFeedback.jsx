import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { withRouter } from 'react-router';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TableContainer from "@material-ui/core/TableContainer";


import SnackBar from '../../../components/UI_Component/SnackBar/SnackBar';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'first_name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'attendance', numeric: true, disablePadding: false, label: 'Attendance' },
  { id: 'smesessioninteraction', numeric: true, disablePadding: false, label: 'SME Session Interaction' },
  { id: 'theory', numeric: true, disablePadding: false, label: 'Theory' },
  { id: 'handson', numeric: true, disablePadding: false, label: 'Hands-on' },
  { id: 'handsonperformance', numeric: true, disablePadding: false, label: 'Hands-on Performance' },
  { id: 'assessment', numeric: true, disablePadding: false, label: 'Assessment %' },
  { id: 'assessmentschedulecompliance', numeric: true, disablePadding: false, label: 'Assessment Schedule Compliance' },
  { id: 'overall', numeric: true, disablePadding: false, label: 'Overall' },
  { id: 'smesinteraction', numeric: true, disablePadding: false, label: "SME's Interaction" },
  { id: 'smename', numeric: true, disablePadding: false, label: 'SME Name' },
  { id: 'remarks', numeric: true, disablePadding: false, label: 'Remarks' },
  { id: 'trainingcompleted', numeric: true, disablePadding: false, label: 'Training Completed' },
  { id: 'trainingcompleteddate', numeric: true, disablePadding: false, label: 'Training Completed Date' },
  { id: 'certification', numeric: true, disablePadding: false, label: 'Certification' },
  { id: 'finalassessmentscore', numeric: true, disablePadding: false, label: 'Final Score' },
  { id: 'percentcompleted', numeric: true, disablePadding: false, label: '% complete' },
  { id: 'spoc', numeric: true, disablePadding: false, label: 'SPOC' },

];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = this.props;

    return (
      <TableHead>
        <TableRow className={classes.tableheader}>
          <TableCell padding="checkbox" className={classes.stickyColumnHeader}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              color="primary"
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
              className={row.id === 'first_name' ? classes.stickyColumnHeaderName : ''}
                key={row.id}
                align={'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, selectedData, userData } = props;

const bulkEdit = () => {

let userdata = userData.filter(user => selectedData.includes(user.id))

  props.history.push({
    pathname: '/trainingcandidateFeedback',
    state: { data:userdata }
   })
}

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Candidates List
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Edit">
            <IconButton aria-label="Edit" onClick={bulkEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  paperRoot: {

    width: '70%',
    margin: '20px auto',
    padding: '10px 20px'
  },
  formControl: {
    margin: '0 8px 8px',
    minWidth: 200,
  },
  tableheader:{
    backgroundColor: '#9de6e6'
  },
  stickyColumnHeader: { position: 'sticky', left: 0, zIndex: 1, background: '#9de6e6' },
  stickyColumnHeaderName: { position: 'sticky', left: 46, zIndex: 1, background: '#9de6e6' },
  stickyColumnCell: { position: 'sticky', left: 0, zIndex: 1, background: '#fff' },
  stickyColumnCellName: { position: 'sticky', left: 46, zIndex: 1, background: '#fff' }
});

class TrainingFeedback extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'first_name',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    trainingListVal:[],
    filteredFeedback:[],
    training_id:'',
    pushData:[],
    snackvariant: '',
    updated_by: '',
    snackmsg: '',
  };

  componentDidMount() {
    this.props.getTrainingList().then((response) => {
      if (response && response.errCode === 200) {
        this.setState({
          trainingListVal: response.arrRes,
          snackvariant: 'success',
          snackBarOpen: true,
          snackmsg: "Training List loaded successfully"
        })
      } else {
        this.setState({
          trainingListVal: [],
          snackvariant: 'error',
          snackBarOpen: true,
          snackmsg: "Error in loading Data"
        })
      }
    });
    
  }

  onCloseSnackBar = () => {
    this.setState({ snackBarOpen: false });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id, name) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleTrainingChange = (e) => {
    const reqObj = {
      training_id : e.target.value,
      user_id : 1,
    }  

    this.props.getCandidateList(reqObj).then((response) => {

      const levels = {"training_id":e.target.value,"attendance":0,"sme_session_interaction":0,"theory":0,"hands_on":0,"hands_on_performance":0,"assessment":'0',"assessment_schedule_compliance":0,"overall":0,"sme_interaction":0,"sme_name":response.sme.sme_name,"remarks":'',"training_completed":'Yes',"training_completed_date":'',"certification":'Foundation',"final_assessment_score":0,"percentage_complete":'0',"spoc":response.programManager.program_manager_name,"default_end_date":false,"actual_training_completed_date":response.sme.enddate} 

      
      if (response && response.errCode === 200) {
        const feedback_given_list =  response.feedback_given_list;
       
        const feedback_notgiven_list =  response.no_feedback_given_list.map(list => {
          return { ...list, ...levels } 
        })
        

        const newdata = [...feedback_notgiven_list, ...feedback_given_list]
        
        this.setState({
          data: newdata,
          selected: [],
          training_id:e.target.value,
          snackvariant: 'success',
          snackBarOpen: true,
          snackmsg: "Candidates Loaded Successfully"
        })
      } else {
        this.setState({
          data: [],
          selected: [],
          training_id:'',
          snackvariant: 'error',
          snackBarOpen: true,
          snackmsg: "Error in Loading Data"
        })
      }
    });
   
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, trainingListVal, filteredFeedback, snackvariant, snackBarOpen, snackmsg } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className="TrainingFeedback_container">

      <Paper className={classes.paperRoot} elevation={3}>
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select Training</InputLabel>
            <Select
              // value={skillId}
              onChange={this.handleTrainingChange}
              label="Search Feedback"
              placeholder="Search Feedback"
            >
              {trainingListVal.map((training) => (
                <MenuItem key={training.id} value={training.id}>{training.training_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TableContainer component={Paper}>
        <EnhancedTableToolbar numSelected={selected.length} selectedData={selected} userData={data} history={this.props.history} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              classes={classes}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      className={classes.stickyColumnCellName}
                      hover
                      onClick={event => this.handleClick(event, n.id, n.first_name)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox" className={classes.stickyColumnCell}>
                        <Checkbox color="primary" checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none" className={classes.stickyColumnCellName}>
                        {n.first_name}
                      </TableCell>
                      <TableCell >{n.attendance}</TableCell>
                      <TableCell >{n.sme_session_interaction}</TableCell>
                      <TableCell >{n.theory}</TableCell>
                      <TableCell >{n.hands_on}</TableCell>
                      <TableCell >{n.hands_on_performance}</TableCell>
                      <TableCell >{n.assessment}</TableCell>
                      <TableCell >{n.assessment_schedule_compliance}</TableCell>
                      <TableCell >{n.overall}</TableCell>
                      <TableCell >{n.sme_interaction}</TableCell>
                      <TableCell >{n.sme_name}</TableCell>
                      <TableCell >{n.remarks}</TableCell>
                      <TableCell >{n.training_completed}</TableCell>
                      <TableCell >{n.training_completed_date}</TableCell>
                      <TableCell >{n.certification}</TableCell>
                      <TableCell >{n.final_assessment_score}</TableCell>
                      <TableCell >{n.percentage_complete}</TableCell>
                      <TableCell >{n.spoc}</TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }} 
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </TableContainer>
        {snackBarOpen &&
            <SnackBar onCloseSnackBar={this.onCloseSnackBar} snackBarOpen={snackBarOpen} snackmsg={snackmsg} snackvariant={snackvariant} />}
      </Paper>
      </div>
    );
  }
}

TrainingFeedback.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,withRouter)(TrainingFeedback);
