import React from 'react';
import MaterialTable from "material-table";
import {
    Paper, withStyles, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent,
    Button
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

const inputField = {
    value: '',
    validation: {
        required: true
    },
    valid: false
};



class AccountMaster extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accountMasterListVal: [],
            showToast: false,
            toastMsg: '',
            accountName: '',
            showAddAccountMasterModal: false,
            formIsValid: false
        }
        this.columnFields = [
            {
                title: "Account Name",
                field: "account_name",
                validate: rowData => rowData.account_name !== ''
            }
        ]
    }

    componentDidMount() {
        this.props.getAccountMasterList().then((response) => {
            if (response && response.arrRes) {
                console.log(response);
                this.setState({
                    accountMasterListVal: response.arrRes,
                    showToast: true,
                    toastMsg: "Account Master Data loaded successfully"
                })
            } else {
                this.setState({
                    accountMasterListVal: [],
                    showToast: true,
                    toastMsg: "Error in loading Account Master Data"
                })
            }
        });
    }



    handleDelete = (id) => {
        const filteredItems = this.state.accountMasterListVal.filter((item) => item.id !== id);
        const reqObj = {
            id: id,
            updated_by: 1
        }

        this.props.deleteAccountMasterList(reqObj).then(response => {
            if (response && response.errCode === 200) {
                this.setState({
                    accountMasterListVal: filteredItems,
                    showToast: true,
                    toastMsg: "Account Master deleted successfully",
                });
            }
            else {
                this.setState({
                    showToast: true,
                    toastMsg: "Error in Account Master deletion"
                });
            }

        });
    }

    editSubmit = (newData) => {
        const reqObj = {
            id: newData.id,
            account_name: newData.account_name
        }
        console.log(reqObj, "req");
        console.log(newData, "newData")
        this.props.editAccountMasterList(reqObj).then(response => {
            if (response && response.errCode === 200) {
                this.setState(prevState => ({
                    accountMasterListVal: prevState.accountMasterListVal.map(
                        el => el.id === newData.id ? {
                            ...el,
                            id: newData.id,
                            account_name: newData.account_name
                        } : el
                    )
                }))
                this.setState({
                    showToast: true,
                    toastMsg: "Account Master Details updated successfully",
                });
            }
            else if (response && response.errCode === 404) {
                this.setState({
                    showToast: true,
                    toastMsg: " Failed in updating Account Master Details "
                });
            }
            else {
                this.setState({
                    showToast: true,
                    toastMsg: "Error in updating the Account Master Details"
                });
            }
        });
    }

    handleModalSubmit = () => {
        const { accountName } = this.state;
        const reqObj = {
            account_name: accountName
        }
        this.props.addAccountMasterList(reqObj).then(response => {
            if (response && response.errCode === 200) {
                const myObj = {
                    id: response.arrRes,
                    account_name: accountName
                }
                const updatedItems = [...this.state.accountMasterListVal, myObj];
                this.setState({
                    accountName: '',
                    showAddAccountMasterModal: false,
                    accountMasterListVal: updatedItems,
                    showToast: true,
                    toastMsg: "Account Master added successfully!"
                })
            }
            else if (response && response.errCode === 404) {
                this.setState({
                    accountName: '',
                    showAddAccountMasterModal: false,
                    showToast: true,
                    toastMsg: " Account Master Already exists!"
                })
            }
            else {
                this.setState({
                    accountName: '',
                    showAddAccountMasterModal: false,
                    showToast: true,
                    toastMsg: "Error in adding Account Master!"
                })
            }
        });
    };

    handleModalClose = () => {
        this.setState({ showAddAccountMasterModal: false, accountName: '' })
    }


    render() {
        const { classes } = this.props;
        const { accountName, showToast, toastMsg } = this.state;
        return (
            <div className="AccountMaster_container">
                <Dialog
                    disableBackdropClick
                    maxWidth="xs"
                    fullWidth={true}
                    open={this.state.showAddAccountMasterModal}
                    onClose={this.handleModalClose}
                    aria-labelledby="Account Master-Name"
                >
                    <DialogTitle id="Account Master-Name">Add Account Master Details</DialogTitle>
                    <DialogContent >
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <Typography style={{ padding: '15px 15px 10px 0' }}>Account Name:</Typography>
                            <TextField
                                autoFocus
                                variant="outlined"
                                margin="dense"
                                placeholder="Account Name"
                                type="text"
                                name="accountName"
                                value={accountName}
                                onChange={(e) => this.setState({ accountName: e.target.value })}
                            />

                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalClose} variant="contained" color="primary">
                            Cancel
                </Button>
                        <Button onClick={this.handleModalSubmit} disabled={accountName === '' || accountName === null} variant="contained" color="primary">
                            Submit
                </Button>
                    </DialogActions>
                </Dialog>
                <Paper className={classes.paperRoot} elevation={3}>
                    <Typography variant="h4" className="text-center" gutterBottom>
                        Account Master
            </Typography>
                    <MaterialTable
                        title=""
                        columns={this.columnFields}
                        data={this.state.accountMasterListVal}
                        style={{ boxShadow: 'none', border: 'solid 1px #ccc' }}
                        options={{
                            actionsColumnIndex: -1,
                            pageSizeOptions: []
                        }}
                        actions={[
                            {
                                icon: 'add',
                                tooltip: 'Add Account Master Data',
                                isFreeAction: true,
                                onClick: (event) => this.setState({ showAddAccountMasterModal: true })
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

export default withStyles(styles, { withTheme: true })(AccountMaster);



