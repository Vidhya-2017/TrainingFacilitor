import React, { Component } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import XLSX from 'xlsx';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Select from 'react-select';
import { MakeColumns } from '../MakeColumns';
import ArrowDown from '../../../common/icons/ArrowDown';
import ArrowUp from '../../../common/icons/ArrowUp';
import '../scss/Home.scss';
import SelectStyles from '../../../components/UI_Component/Select/SelectStyles';

import { Paper, Typography, List, Grid, ListItem, ListItemIcon, Checkbox, TextField, ListItemText, IconButton, withStyles } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import MaterialTable from "material-table";

import SnackBar from "../../../components/UI_Component/SnackBar/SnackBar";

const months = [{ value: 'January', label: 'January' }, { value: 'February', label: 'February' }, { value: 'March', label: 'March' }, { value: 'April', label: 'April' }, { value: 'May', label: 'May' }, { value: 'June', label: 'June' }, { value: 'July', label: 'July' }, { value: 'August', label: 'August' }, { value: 'September', label: 'September' }, { value: 'October', label: 'October' }, { value: 'November', label: 'November' }, { value: 'December', label: 'December' }]


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      selectedSheet: null,
      selectedTraining: null,
      trainingList: [],
      sheetOptions: [],
      snackBarOpen: false,
      snackmsg: '',
      snackvariant: '',
    }
    this.columnFields = [

    ]
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
            label: list.training_name
          }
        });
        this.setState({ trainingList });
      } else {
        this.setState({ snackBarOpen: true, snackmsg: 'Something went Wrong. Please try again later', snackvariant: "error" })
      }
    })
  }

  getFileDetails = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      this.setState({ file: files[0] });
      this.handleFile(files[0]);
    }
  }

  handleFile(file, sheet = 4) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
      const sheetOptions = wb.SheetNames.map((sheet, index) => {
        return {
          value: index,
          label: sheet
        }
      });
      this.setState({ sheetOptions });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  }

  submitSheet = () => {
    this.setState({ snackBarOpen: false })
    if (this.state.selectedTraining !== null) {

      const { file, data, selectedTraining } = this.state;
      var reader = new FileReader();
      reader.onload = (e) => {
        var binaryData = e.target.result;
        var base64String = window.btoa(binaryData);
        const reqObj = {
          // mime: file.type,
          details: data,
          created_by: 1,
          training_id: selectedTraining.value,
          // sheetname : this.state.selectedSheet.label,
          updated_by: 1

        }

        this.props.insertCandidates(reqObj).then((response) => {

          if (response && response.errCode === 200) {

            this.setState({ sheetOptions: [], file: {}, data: [], selectedTraining: null, snackBarOpen: true, snackmsg: 'Candidates Uploaded Successfully', snackvariant: "success" });
          } else if (response.errCode === 404) {

            const snackmsg = 'We have ' + `${response.Email_exist.length}` + ' Existing Data and ' + `${response.Format_error_list.length}` + ' Format Error Data and Remaining Data has been Uploaded Successfully';
            this.setState({ sheetOptions: [], file: {}, data: [], selectedTraining: null, snackBarOpen: true, snackmsg, snackvariant: "success" })

          }
        });
      };
      reader.readAsBinaryString(file);
    } else {
      this.setState({ snackBarOpen: true, snackmsg: 'Please Select a Training', snackvariant: "error" })
    }
  }

  handleChange = selectedSheet => {

    const { file } = this.state;
    this.setState({ selectedSheet: selectedSheet, data: [], cols: [] });
    this.columnFields = [];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
      const wsname = wb.SheetNames[selectedSheet.value];
      const ws = wb.Sheets[wsname];
      let columns = [];
      let sheetData = XLSX.utils.sheet_to_json(ws, {
        header: 1,
        defval: '',
        blankrows: false
      });
      if (sheetData.length > 0) {
        columns = sheetData[0].map(col => {

          return {
            dataField: col.toString().trim(),
            text: col,
            sort: true,
            filter: false,
            sortCaret: (order, column) => {
              if (!order) return (<span><ArrowUp /><ArrowDown /></span>);
              else if (order === 'asc') return (<span><ArrowUp /></span>);
              else if (order === 'desc') return (<span><ArrowDown /></span>);
              return null;
            }
          }
        });
      }
      const data = XLSX.utils.sheet_to_json(ws, { raw: false });

      Object.keys(data[0]).forEach((key, index) => {
        if (key === 'Expected Joining Date') {
          this.columnFields.push(
            {
              title: key,
              field: key,
              editComponent: props => (
                <TextField
                  id="Expected Joining Date"
                  name="Expected Joining Date"
                  type="date"
                  value={props.value}
                  onChange={e => props.onChange(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              ),
            },
          )
        } else if (key === 'Joining Month') {
          this.columnFields.push(
            {
              title: key,
              field: key,
              editComponent: props => {
                console.log(props);
                const defaultLabel = (typeof props.rowData["Joining Month"] === 'string') ? props.rowData["Joining Month"] : props.rowData["Joining Month"].label;
                return (
                  <Select
                    placeholder="Joining Month"
                    onChange={e => props.onChange(e)}
                    options={months}
                    styles={SelectStyles()}
                    defaultValue={{ value: props.value, label: defaultLabel }}
                  />
                )
              },
            },
          )
        } else {
          this.columnFields.push(
            {
              title: key,
              field: key,

            },
          )
        }

      });

      this.setState({ data: data, cols: columns });
    };
    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  showFilter = (e) => {
    const { cols } = this.state;

    let filterOptions = [...cols];
    if (e.target.checked) {
      filterOptions = filterOptions.map(item => {
        item.filter = textFilter({
          delay: 1000,
          className: 'filterTextField',
          placeholder: item.dataField,
          onClick: e => console.log(e)
        });
        return item;
      });
    } else {
      filterOptions = filterOptions.map(item => {
        item.filter = '';
        return item;
      });
    }
    this.setState({ cols: filterOptions });
  }

  editSubmit = (newData, oldData) => {
    const data = [...this.state.data];
    data[data.indexOf(oldData)] = newData;
    this.setState(prevState => ({
      data: prevState.data.map(
        el => el.Email === newData.Email ? {
          ...el,
          id: newData.id,
          "Joining Month": newData['Joining Month'].value ? newData['Joining Month'].value : newData['Joining Month'],
        } : el
      )
    }))
  }

  handleDelete = (oldData) => {
    const data = [...this.state.data];
    data.splice(data.indexOf(oldData), 1);
    this.setState({
      data: data,
    });

  }

  selectChange = selectoption => {
    this.setState({ selectedTraining: selectoption });
  };

  handleClick = () => {
    this.setState({ snackBarOpen: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackBarOpen: false });
  };

  render() {
    const { file, data, cols, snackBarOpen, snackvariant, snackmsg, selectedTraining, trainingList, selectedSheet, sheetOptions } = this.state;

    const recordPerPageVal = Math.ceil(data.length / 10) * 10;
    const recordPerPageOptions = [
      { text: "10", page: 10 },
      { text: "20", page: 20 },
      { text: "30", page: 30 },
      { text: "50", page: 50 }
    ];
    const options = [];
    recordPerPageOptions.forEach(item => {
      if (recordPerPageVal >= item.page) {
        options.push(item);
      }
    });
    const sizePerPageRenderer = ({
      // options,
      currSizePerPage,
      onSizePerPageChange
    }) => (
        <div className="btn-group recordPerPage" role="group">
          {
            options.map((option) => {
              const isSelect = currSizePerPage === `${option.page}`;
              return (
                <button
                  key={option.text}
                  type="button"
                  onClick={() => onSizePerPageChange(option.page)}
                  className={`btn ${isSelect ? 'pageSelectedBtn' : 'pageBtn'}`}
                >
                  {option.text}
                </button>
              );
            })
          }
        </div>
      );
    const pageButtonRenderer = ({
      page,
      active,
      disable,
      title,
      onPageChange
    }) => {
      const handleClick = (e) => {
        e.preventDefault();
        onPageChange(page);
      };
      const activeStyle = {
        border: 'none',
        padding: '6px 12px',
        color: 'white'
      };
      if (active) {
        activeStyle.backgroundColor = '#1b91e5a8';
      } else {
        activeStyle.backgroundColor = '#1b91e5';
      }
      if (typeof page === 'string') {
        activeStyle.backgroundColor = '#1b91e5';
      }
      return (
        <li key={page} className="page-item">
          <button key={page} onClick={handleClick} style={activeStyle}>{page}</button>
        </li>
      );
    };
    const paginationOptions = {
      sizePerPageRenderer,
      pageButtonRenderer
    };

    const selectStyles = {
      control: styles => ({
        ...styles,
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        minWidth: 200,
        minHeight: 40,
        borderColor: '#000',
        borderRadius: '5px',
        marginBottom: '3px',
        outline: 'transparent',
        boxShadow: 'none',
        ':hover': {
          borderColor: '#000000',
          boxShadow: '0 0 0 1px #000000',
        },
        ':active': {
          borderColor: '#000000',
          boxShadow: '0 0 0 1px #000000',
        },
        ':focus': {
          borderColor: '#000000',
          boxShadow: '0 0 0 1px #000000'
        }
      }),
      menu: styles => ({ ...styles, backgroundColor: '#fff', border: '1px solid #999' }),
      indicatorSeparator: styles => ({ ...styles, backgroundColor: 'none' }),
      option: (styles, { isFocused, isSelected }) => {
        return {
          ...styles,
          backgroundColor: '#fff',
          ':active': {
            backgroundColor: '#eee',
          },
          ':hover': {
            backgroundColor: '#dadada',
          },
          ':focus': {
            backgroundColor: '#eee',
          },
          color: isSelected ? '#000' : '#333'
        }
      }
    }
    return (
      <div>
        <section className='handlerContainer'>
          <div className='uploadBtn'>
            <label htmlFor="fileUpload" className="file-upload fileUploadBtn btn shadow">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" /></svg>
              <span>Choose a file&hellip;</span>
              <input id="fileUpload" type="file" onChange={this.getFileDetails} />
            </label>
            {file && file.name && <span className='fileName'>{file.name}</span>}
          </div>
          {sheetOptions.length > 0 && <Select
            value={selectedTraining}
            onChange={this.selectChange}
            options={trainingList}
            styles={selectStyles}
            placeholder='Select the Training'
          />}
          {sheetOptions.length > 0 && <Select
            value={selectedSheet}
            onChange={this.handleChange}
            options={sheetOptions}
            styles={selectStyles}
            placeholder='Select the Sheet'
          />}
          {data.length > 0 &&
            <div className="custom-control custom-switch filterSwitch">
              <input type="checkbox" className="custom-control-input" onChange={this.showFilter} id="customSwitch1" />
              <label className="custom-control-label" for="customSwitch1">Show Filter Options</label>
            </div>
          }
          {sheetOptions.length > 0 && <div className='uploadBtn'>
            <Button disabled={data.length === 0} className='file-upload fileUploadBtn btn shadow' onClick={this.submitSheet}>Submit</Button>
          </div>
          }

        </section>

        {data.length > 0 &&
          <div className='candidateListTable'>
            <MaterialTable
              title=""
              columns={this.columnFields}
              data={data}
              style={{ boxShadow: 'none', border: 'solid 1px #ccc' }}
              options={{
                actionsColumnIndex: -1,
                pageSizeOptions: []
              }}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    resolve();
                    if (oldData) {
                      console.log('--oldData-', oldData);
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
          </div>
        }
        {data.length > 0 && <Alert className='noteContainer' variant='secondary'>
          ** Please check the candidate data and then click <b>Submit</b> to save the excel sheet.
        </Alert>}
        {snackBarOpen &&
                     <SnackBar snackBarOpen={snackBarOpen} snackmsg={snackmsg} snackvariant={snackvariant} />}
      </div>
    );
  }
}

export default Home;
