import React from 'react';
import MaterialTable from "material-table";
import {
    Paper, withStyles, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent,
    Button
} from '@material-ui/core';
import Select from 'react-select';
import SelectStyles from '../../../components/UI_Component/Select/SelectStyles';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';
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

const smeRegForm = {
    smeName: { ...inputField },
    emailId: { ...inputField },
    skills: { ...inputField },
    contactNumber: { ...inputField },
    sapId: { ...inputField }
}

class SMEList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formValues: { ...smeRegForm },
            smeListVal: [],
            showToast: false,
            toastMsg: '',
            skillList: [],
            showAddSMEModal: false,
            formIsValid: false
        }
        this.columnFields = [
            {
                title: "SME Name",
                field: "name",
                validate: rowData => rowData.name !== ''
            },
            {
                title: "Contact Number",
                field: "phone_number",
                validate: rowData => rowData.phone_number !== ''
            },
            {
                title: "Sap Id",
                field: "sap_id",
                validate: rowData => rowData.sap_id !== ''
            },
            {
                title: "Email id",
                field: "email",
                validate: rowData => rowData.email !== ''
            },
            {
                title: "Skills",
                field: "SkillName",
                editComponent: props => {
                    const defaultValue = this.state.skillList.filter(skill => props.rowData.skills.includes(skill.id))
                    return (
                        <Select
                            placeholder="Skills"
                            onChange={e => props.onChange(e)}
                            options={this.state.skillList}
                            styles={SelectStyles()}
                            isMulti
                            defaultValue={defaultValue}
                        />
                    )
                },
                validate: rowData => rowData.skills !== '',
            }
        ]
    }

    componentDidMount() {
        this.props.getSMEList().then((response) => {
            console.log(response.arrRes);
            if (response && response.arrRes) {
                this.setState({
                    smeListVal: response.arrRes,
                    showToast: true,
                    toastMsg: "SME Data loaded successfully"
                })
            } else {
                this.setState({
                    smeListVal: [],
                    showToast: true,
                    toastMsg: "Error in loading SME Data"
                })
            }
        });
        this.getSkillList();
    }

    getSkillList = () => {
        this.props.getSkillList().then(response => {
            if (response && response.errCode === 200) {
                const skillList = response.arrRes.map(list => {
                    return {
                        value: list.id,
                        id: list.id,
                        label: list.skill_name
                    }
                });
                this.setState({ skillList });
            } else {
                this.setState({ showToast: true, toastMsg: 'Something went Wrong. Please try again later.' })
            }
        })
    }

    handleDelete = (id) => {
        const filteredItems = this.state.smeListVal.filter((item) => item.id !== id);
        const reqObj = {
            id: id,
            updated_by: 1
        }

        this.props.deleteSMEList(reqObj).then(response => {
            if (response && response.errCode === 200) {
                this.setState({
                    smeName: '',
                    smeListVal: filteredItems,
                    deleteModal: false,
                    showToast: true,
                    toastMsg: "SME deleted successfully",
                });
            }
            else {
                this.setState({
                    smeName: '', deleteModal: false,
                    showToast: true,
                    toastMsg: "Error in SME deletion"
                });
            }

        });
    }

    editSubmit = (newData, oldData) => {

        const skillIds = newData.SkillName.map(skill => skill.id);
        console.log(skillIds);
        console.log(this.state.smeListVal);
        console.log(newData);
        const reqObj = {
            id: newData.id,
            name: newData.name,
            email: newData.email,
            sapid: newData.sap_id,
            skills: skillIds,
            phone_number: newData.phone_number,
            updated_by: "1"
        }

        console.log(reqObj);
        this.props.editSMEList(reqObj).then(response => {
            console.log(this.state.smeListVal);
            console.log(response);
            if (response && response.errCode === 200) {
                this.setState(prevState => ({
                    smeListVal: prevState.smeListVal.map(
                        el => el.id === newData.id ? {
                            ...el,
                            name: newData.name,
                            email: newData.email,
                            sap_id: newData.sap_id,
                            SkillName: response.skill_name,
                            phone_number: newData.phone_number
                        } : el
                    )
                }))
                this.setState({
                    SmeName: '',
                    showToast: true,
                    toastMsg: "SME Details updated successfully",
                });
            }
            else if (response && response.errCode === 404) {
                this.setState({
                    SmeName: '',
                    showToast: true,
                    toastMsg: " Failed in updating SME Details "
                });
            }
            else {
                this.setState({
                    SmeName: '',
                    showToast: true,
                    toastMsg: "Error in updating the SME Details"
                });
            }
        });
    }

    handleModalSubmit = () => {
        const { formValues } = this.state;
        console.log(formValues);
        const reqObj = {
            name: formValues.smeName.value,
            sapid: formValues.sapId.value,
            phone_number: formValues.contactNumber.value,
            skills: formValues.skills.value,
            email: formValues.emailId.value,
            created_by: 1,
            updated_by: 1
        }
        

      
        this.props.addSMEList(reqObj).then(response => {
            console.log(response);
            console.log(this.state.smeListVal);
            if (response && response.errCode === 200) {
                const skillNames = [];
                this.state.skillList.forEach(list => {
                    if(formValues.skills.value.includes(list.id)) {
                        skillNames.push(list.label)
                    }
                })
                const myObj = {
                    name: formValues.smeName.value,
                    sap_id: formValues.sapId.value,
                    phone_number: formValues.contactNumber.value,
                    email: formValues.emailId.value,
                    SkillName: skillNames.toString()
                }
                const updatedItems = [...this.state.smeListVal, myObj];
                this.setState({
                    add: false,
                    formValues: { ...smeRegForm },
                    showAddSMEModal: false,
                    smeListVal: updatedItems,
                    showToast: true,
                    toastMsg: "SME added successfully!"
                })
            }
            else if (response && response.errCode === 404) {
                this.setState({
                    SmeName: '',
                    add: false,
                    showAddSMEModal: false,
                    showToast: true,
                    toastMsg: " SME Already exists!"
                })
            }
            else {
                this.setState({
                    SmeName: '',
                    add: false,
                    showAddSMEModal: false,
                    showToast: true,
                    toastMsg: "Error in adding SME!"
                })
            }
        });
    };

    handleModalClose = () => {
        this.setState({ showAddSMEModal: false, SmeName: '' })
    }

    inputFieldChange = (e) => {
        const targetName = e.target.name;
        const targetValue = e.target.value;
        const targetType = e.target.type ? e.target.type : '';
        const updatedRegForm = {
            ...this.state.formValues
        };
        const updatedFormElement = {
            ...updatedRegForm[targetName]
        };
        updatedFormElement.value = targetValue;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, targetType, targetName);
        updatedRegForm[targetName] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedRegForm) {
            formIsValid = updatedRegForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ formValues: updatedRegForm, formIsValid });
    }

    checkValidity(inputValue, rules, inputType, inputName) {
        if (inputValue) {
            const value = inputValue.toString();
            let isValid = true;
            if (!rules) {
                return true;
            }
            if (rules.required) {
                isValid = value.trim() !== '' && isValid;
            }
            if (rules.isNumeric) {
                const pattern = /^\d+$/;
                isValid = pattern.test(value) && isValid
            }
            if (inputType === "email") {
                const pattern = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);
                isValid = pattern.test(value) && isValid
            }
            if (inputName === "sapId") {
                const pattern = RegExp(/^([+]\d{2})?\d{8}$/);
                isValid = pattern.test(value) && isValid
            }
            if (inputName === "contactNumber") {
                const pattern = RegExp(/^([+]\d{2})?\d{10}$/);
                isValid = pattern.test(value) && isValid
            }
            return isValid;
        }
    }

    render() {
        const { classes } = this.props;
        const { formIsValid, showToast, toastMsg, skillList, formValues } = this.state;
        return (
            <div className="SMEList_container">
                <Dialog
                    disableBackdropClick
                    maxWidth="xs"
                    fullWidth={true}
                    open={this.state.showAddSMEModal}
                    onClose={this.handleModalClose}
                    aria-labelledby="SME-Name"
                >
                    <DialogTitle id="SME-Name">Add SME Details</DialogTitle>
                    <DialogContent >
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <Typography style={{ padding: '15px 15px 10px 0' }}>SME Name:</Typography>
                            <TextField
                                autoFocus
                                variant="outlined"
                                margin="dense"
                                placeholder="SME Name"
                                type="text"
                                name="smeName"
                                value={formValues.smeName.value}
                                onChange={this.inputFieldChange}
                            />
                            <Typography style={{ padding: '15px 15px 10px 0' }}>Sap Id:</Typography>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                placeholder="Sap Id"
                                type="text"
                                name="sapId"
                                value={formValues.sapId.value}
                                onChange={this.inputFieldChange}
                            />
                            <Typography style={{ padding: '15px 15px 10px 0' }}>Email Id:</Typography>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                placeholder="Email Id"
                                type="email"
                                name="emailId"
                                value={formValues.emailId.value}
                                onChange={this.inputFieldChange}
                            />
                            <Typography style={{ padding: '15px 15px 10px 0' }}>Contact Number:</Typography>
                            <TextField
                                variant="outlined"
                                margin="dense"
                                placeholder="Contact Number"
                                type="text"
                                name="contactNumber"
                                value={formValues.contactNumber.value}
                                onChange={this.inputFieldChange}
                            />
                            <Typography style={{ padding: '15px 15px 10px 0' }}>Select Skills:</Typography>
                            <SelectOne
                                fieldLabel="Skills"
                                id="skills"
                                name="skills"
                                placeholder="Skills"
                                value={formValues.skills && formValues.skills.value}
                                isMulti={true}
                                options={skillList}
                                onChange={this.inputFieldChange}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalClose} variant="contained" color="primary">
                            Cancel
                </Button>
                        <Button onClick={this.handleModalSubmit} disabled={!formIsValid} variant="contained" color="primary">
                            Submit
                </Button>
                    </DialogActions>
                </Dialog>
                <Paper className={classes.paperRoot} elevation={3}>
                    <Typography variant="h4" className="text-center" gutterBottom>
                        SME List
            </Typography>
                    <MaterialTable
                        title=""
                        columns={this.columnFields}
                        data={this.state.smeListVal}
                        style={{ boxShadow: 'none', border: 'solid 1px #ccc' }}
                        options={{
                            actionsColumnIndex: -1,
                            pageSizeOptions: []
                        }}
                        actions={[
                            {
                                icon: 'add',
                                tooltip: 'Add SME Data',
                                isFreeAction: true,
                                onClick: (event) => this.setState({ showAddSMEModal: true })
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

export default withStyles(styles, { withTheme: true })(SMEList);



