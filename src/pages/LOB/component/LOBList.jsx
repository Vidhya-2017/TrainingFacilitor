import React from 'react';
import MaterialTable from "material-table";
import {
    Paper, withStyles, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent, Button
} from '@material-ui/core';

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

class LOBList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            LOBListVal: [],
            showAddLOBModal: false,
            showToast: false,
            toastMessage: ''
        }
        this.columnFields = [
            {
                title: "Name",
                field: "lob_name",
                validate: rowData => rowData.lob_name !== '',
            },
        ]
    }

    componentDidMount() {
        this.props.getLOBList().then((response) => {
            if (response && response.arrRes) {
                this.setState({
                    LOBListVal: response.arrRes,
                    newLOBName: '',
                    showToast: true,
                    toastMessage: "LOB Data loaded successfully"
                })
            } else {
                this.setState({
                    LOBListVal: [],
                    showToast: true,
                    toastMessage: "Error in loading LOB Data"
                })
            }
        });
    }

    handleModalClose = () => {
        this.setState({ showAddLOBModal: false, newLOBName: '' })
    }

    handleModalSubmit = () => {
        const { newLOBName } = this.state;
        const reqObj = {
            lob_name: newLOBName,
        }
        this.props.addLOB(reqObj).then(response => {
            if (response && response.errCode === 200) {
                const myObj = {
                    id: response.arrResid,
                    lob_name: response.arrRes
                }
                const updatedItems = [...this.state.LOBListVal, myObj];
                this.setState({
                    showAddLOBModal: false,
                    LOBListVal: updatedItems,
                    newLOBName: '',
                    showToast: true,
                    toastMessage: "LOB name added successfully!"
                })
            }
            else if (response && response.errCode === 404) {
                this.setState({
                    showAddLOBModal: false,
                    showToast: true,
                    toastMessage: "Already LOB name exists!"
                })
            }
            else {
                this.setState({
                    showAddLOBModal: false,
                    showToast: true,
                    toastMessage: "error in adding LOB name!"
                })
            }
        });
    };

    editSubmit = (newData, oldData) => {
        const reqObj = {
            id: newData.id,
            lob_name: newData.lob_name,
        }
        this.props.editLOB(reqObj).then(response => {
            if (response && response.errCode === 200) {
                const data = [...this.state.LOBListVal];
                data[data.indexOf(oldData)] = newData;
                this.setState(prevState => ({
                    ...prevState, LOBListVal: data, colsassessmentType: '',
                    showToast: true,
                    toastMessage: "LOB name updated successfully",
                }))
            }
            else if (response && response.errCode === 404) {
                this.setState({
                    showToast: true,
                    toastMessage: " failed in updating LOB name"
                });
            }
            else {
                this.setState({
                    showToast: true,
                    toastMessage: "error in updating the LOB name"
                });
            }
        });
    }

    handleDelete = (oldData) => {
        const reqObj = {
            id: oldData.id,
        }
        this.props.deleteLOB(reqObj).then(response => {
            if (response && response.errCode === 200) {
                const data = [...this.state.LOBListVal];
                data.splice(data.indexOf(oldData), 1);
                this.setState({
                    LOBListVal: data,
                    showToast: true,
                    toastMessage: "LOB name deleted successfully",
                });
            }
            else {
                this.setState({
                    showToast: true,
                    toastMessage: "Error in LOB name deletion"
                });
            }
        });
    }

    render() {
        const { LOBListVal, showAddLOBModal, showToast, toastMessage, newLOBName } = this.state;
        const { classes } = this.props;
        return (
            <div className="lob_container">
                <Dialog
                    disableBackdropClick
                    maxWidth="xs"
                    fullWidth={true}
                    open={showAddLOBModal}
                    onClose={this.handleModalClose}
                    aria-labelledby="lob"
                >
                    <DialogTitle id="lob">Add LOB</DialogTitle>
                    <DialogContent >
                        <div style={{ display: 'flex' }}>
                            <Typography style={{ padding: '15px 15px 10px 0' }}>LOB Name:</Typography>
                            <TextField
                                autoFocus
                                variant="outlined"
                                margin="dense"
                                placeholder="LOB Name"
                                type="text"
                                value={newLOBName}
                                onChange={(e) => this.setState({ newLOBName: e.target.value })}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalClose} variant="contained" color="primary">
                            Cancel
                </Button>
                        <Button onClick={this.handleModalSubmit} disabled={newLOBName === '' || newLOBName === null} variant="contained" color="primary">
                            Submit
                </Button>
                    </DialogActions>
                </Dialog>
                <Paper className={classes.paperRoot} elevation={3}>
                    <Typography variant="h4" className="text-center" gutterBottom>
                        Line of Bussiness
            </Typography>
                    <MaterialTable
                        title=""
                        columns={this.columnFields}
                        data={LOBListVal}
                        style={{ boxShadow: 'none', border: 'solid 1px #ccc' }}
                        options={{
                            actionsColumnIndex: -1,
                            pageSizeOptions: []
                        }}
                        actions={[
                            {
                                icon: 'add',
                                tooltip: 'Add LOB Type',
                                isFreeAction: true,
                                onClick: (event) => this.setState({ showAddLOBModal: true })
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

export default withStyles(styles, { withTheme: true })(LOBList);