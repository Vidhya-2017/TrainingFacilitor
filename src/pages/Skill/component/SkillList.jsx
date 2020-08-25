import React from 'react';
import MaterialTable from "material-table";
import {
    Paper, withStyles, Typography, Dialog, DialogTitle, TextField, DialogActions, DialogContent,
    Button
} from '@material-ui/core';
import moment from 'moment';
import ToastBox from '../../../components/UI_Component/Toast/ToastBox';
import '../scss/SkillList.scss'

const styles = (theme) => ({
    iconRoot: {
        color: '#6b6b6b'
    },
    paperRoot: {
        // margin: theme.spacing(6, 18),
        // padding: theme.spacing(4),
        width: '70%',
        margin: '20px auto',
        padding: '10px 20px'
    },
});
class SkillList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            skillListVal: [],
            showAddSkillModal: false,
            newSkillName: '',
            showToast: false,
            updated_by: '',
            toastMessage: ''
        }
        this.columnFields = [
            {
                title: "Skill Name",
                field: "skill_name",
                validate: rowData => rowData.skill_name !== '',
            },
        ]
    }

    componentDidMount() {
        this.props.getSkillList().then((response) => {
            if (response && response.errCode === 200) {
                this.setState({
                    skillListVal: response.arrRes,
                    showToast: true,
                    toastMessage: "Skill Data loaded successfully"
                })
            } else {
                this.setState({
                    skillListVal: [],
                    showToast: true,
                    toastMessage: "Error in loading Skill Data"
                })
            }
        });
    }

    handleDelete = (id) => {
        const filteredItems = this.state.skillListVal.filter((item) => item.id !== id);
        const reqObj = {
            id: id,
            updated_by: 1
        }
        this.props.deleteSkillList(reqObj).then(response => {
            if (response.errCode === 200) {
                this.setState({
                    skillListVal: filteredItems,
                    showToast: true,
                    toastMessage: "Skill name deleted successfully",
                });
            }
            else {
                this.setState({
                    showToast: true,
                    toastMessage: "Error in Skill name deletion"
                });
            }

        });
    }

    editSubmit = (newData, oldData) => {
        console.log(newData);
        console.log(this.state.skillListVal, "Val")
        const reqObj = {
            id: newData.id,
            skill_name: newData.skill_name,
            updated_by: this.state.updated_by
        }
        console.log(reqObj);
        this.props.editSkillList(reqObj).then(response => {
            if (response.errCode === 200) {
                this.setState(prevState => ({
                    skillListVal: prevState.skillListVal.map(
                        el => el.id === newData.id ? { ...el, skill_name: newData.skill_name } : el
                    )
                }))
                this.setState({
                    showToast: true,
                    toastMessage: "Skill name updated successfully",
                });
            }
            else if (response.errCode === 404) {
                this.setState({
                    showToast: true,
                    toastMessage: " failed in updating Skill name "
                });
            }
            else {
                this.setState({
                    showToast: true,
                    toastMessage: "error in updating the Skill name"
                });
            }
        });
    }

    handleModalClose = () => {
        this.setState({ showAddSkillModal: false, newSkillName: '' })
    }

    handleModalSubmit = () => {
        const { newSkillName } = this.state;
        const date = moment().format("YYYY-MM-DD");
        const reqObj = {
            skill_name: newSkillName,
            created_by: 1,
            updated_by: 1,
            created_date: date
        }
        this.props.addSkillList(reqObj).then(response => {
            if (response && response.errCode === 200) {
                const myObj = {
                    id: response.AddedSkillId,
                    skill_name: response.AddedSkillName
                }
                const updatedItems = [...this.state.skillListVal, myObj];
                this.setState({
                    showAddSkillModal: false,
                    skillListVal: updatedItems,
                    showToast: true,
                    toastMessage: "Skill name added successfully!"
                })
            }
            else if (response && response.errCode === 404) {
                this.setState({
                    showAddSkillModal: false,
                    showToast: true,
                    toastMessage: "Already Skill name exists!"
                })
            }
            else {
                this.setState({
                    showAddSkillModal: false,
                    showToast: true,
                    toastMessage: "error in adding aseessment name!"
                })
            }
        });
    };


    render() {
        const { skillListVal, showAddSkillModal, newSkillName } = this.state;
        const { classes } = this.props;
        return (
            <div className="SkillList_container">
                <Dialog
                    disableBackdropClick
                    maxWidth="xs"
                    fullWidth={true}
                    open={showAddSkillModal}
                    onClose={this.handleModalClose}
                    aria-labelledby="Skill-Name"
                >
                    <DialogTitle id="Skill-Name">Add Skill Name</DialogTitle>
                    <DialogContent >
                        <div style={{ display: 'flex' }}>
                            <Typography style={{ padding: '15px 15px 10px 0' }}>Skill Name:</Typography>
                            <TextField
                                autoFocus
                                variant="outlined"
                                margin="dense"
                                placeholder="Skill Name"
                                type="text"
                                value={newSkillName}
                                onChange={(e) => this.setState({ newSkillName: e.target.value })}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalClose} variant="contained" color="primary">
                            Cancel
                </Button>
                        <Button onClick={this.handleModalSubmit} disabled={newSkillName === '' || newSkillName === null} variant="contained" color="primary">
                            Submit
                </Button>
                    </DialogActions>
                </Dialog>
                <Paper className={classes.paperRoot} elevation={3}>
                    <Typography variant="h4" className="text-center" gutterBottom>
                        Skill List
            </Typography>
                    <MaterialTable
                        title=""
                        columns={this.columnFields}
                        data={skillListVal}
                        style={{ boxShadow: 'none', border: 'solid 1px #ccc' }}
                        options={{
                            actionsColumnIndex: -1,
                            pageSizeOptions: []
                        }}
                        actions={[
                            {
                                icon: 'add',
                                tooltip: 'Add Skill Name',
                                isFreeAction: true,
                                onClick: (event) => this.setState({ showAddSkillModal: true })
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
                </Paper>
            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(SkillList);