import React, { Fragment } from 'react';
import { AppBar, Tabs, Tab, Paper, withStyles, Typography, Card, CardContent, CardActions, Button, List, ListItem,  ListItemText, Checkbox, Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@material-ui/core';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';

const styles = theme => ({
  paperRoot: {
    width: '100%',
    padding: '10px 15px'
  },
  dialogRoot:{
    width: '700px',
   
  }
})
class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      trainingList: [],
      selectedTraining: null,
      skillList: [],
      curriculumList: [],
      trainingCurriculumlist: [],
      activeTab: [],
      openDialog: false,
    }
   // this.trainingCurriculumlist = [];
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
            label: list.training_name,
            skillsID: list.skills,
            skill_name: list.skill_name.split(','),
            sme_name: list.sme_name,
            smeID: list.sme,
            skillData: list.skills_array,
          }
        });
        this.setState({ trainingList, trainingCurriculumlist:[]});
      } else {
        this.setState({ snackbaropen: true, snackmsg: 'Something went Wrong. Please try again later', snackvariant: "error" })
      }
    })
  }

 

  selectTrainingChange = (selectedTraining) => {
    const { trainingList,curriculumList } = this.state;
    const skillDetails = selectedTraining.target.skillData.map((list, index) => {
      return {
        skillname: list.skill_name,
        skillId: list.id
      }
    });  
    this.getTopicList(selectedTraining.target.value);
    this.setState({ selectedTraining: selectedTraining.target, skillList: skillDetails,tabValue: skillDetails[0].skillId});

  }

  getTopicList = (training_id) => {
    const TempCurri =[];
    const { trainingCurriculumlist } = this.state;
    const reqObj = { training_id };
    this.props.getTopicList(reqObj).then((response) => {
      if (response && response.errCode === 200) {
         response.arrRes.forEach(cdata => {
          cdata.curriculum.forEach(cadata => {
            TempCurri.push({...cadata, checked: true});
          });
        });
        
        this.setState({ curriculumList: response.arrRes, trainingCurriculumlist:TempCurri});
      } else {
        this.setState({ snackbaropen: true, snackmsg: 'Something went Wrong. Please try again later', snackvariant: "error" })
      }
    }) 
  }
  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  handleClickOpen = () => { 
    this.setState({ openDialog: true });
  };
  
  handleClose = () => {
    this.setState({ openDialog: false });
  };
 
  handleSubmit = () => {
    const { trainingCurriculumlist,selectedTraining,skillList } = this.state;
    const finalTopic = [];
    trainingCurriculumlist.filter(trueData => trueData.checked === true).map(filteredPerson => (
      finalTopic.push(filteredPerson)
    ))
    const reqObj = {
      training_id: selectedTraining.value,
      curriculumData: finalTopic,
      created_by: 1,
      skill_id:selectedTraining.skillsID

    }
      console.log(reqObj);
      this.submitCurriculum(reqObj);

  }
  
  submitCurriculum = (reqObj) => {  

    this.props.submitCurriculum(reqObj).then((response) => {
      if (response && response.errCode === 200) {
        console.log(response);
        this.setState({ openDialog: false, trainingCurriculumlist:[], selectedTraining:null, skillList:[] });
      } else {
        this.setState({ snackbaropen: true, snackmsg: 'Something went Wrong. Please try again later', snackvariant: "error" })
      }
    }) 

  }

  handleToggle = value => () => {
    const { trainingCurriculumlist } = this.state;
    const topicIndex = trainingCurriculumlist && trainingCurriculumlist.findIndex((lst) => value === lst.id);
     trainingCurriculumlist[topicIndex].checked = !trainingCurriculumlist[topicIndex].checked;
     this.setState({  trainingCurriculumlist });
  };



  render() {
    const { classes } = this.props;
    const { tabValue, skillList, selectedTraining, trainingList, activeTab,trainingCurriculumlist } = this.state;
    const skillFilter = trainingCurriculumlist.filter(curList => curList.skill_id === tabValue);
    return (
      <Paper className={classes.paperRoot} elevation={0}>
        <SelectOne
          fieldLabel="Training List"
          id="training"
          name="training"
          placeholder="Training"
          value={selectedTraining ? selectedTraining : null}
          options={trainingList}
          onChange={this.selectTrainingChange}
        />
        {skillList.length > 0 &&
          <Fragment>
            <AppBar position="static" elevation={1} color="transparent">
              <Tabs
                value={tabValue}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                {skillList.map(skill =>
                  <Tab key={skill.skillId} label={skill.skillname} value={skill.skillId} />
                )}
              </Tabs>
            </AppBar>
            <Card square className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                { skillFilter && skillFilter.length > 0  &&
               <List >
                    {skillFilter.map(value => { 
                      return ( 
                      <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggle(value.id)}>
                        <Checkbox
                          //checked={this.state.checked.indexOf(value.id) !== -1}
                          checked={value.checked}
                          tabIndex={-1}
                          disableRipple
                        />
                        <ListItemText primary={value.name} />
                      </ListItem>
                      ); 
                    })}
                  </List> }
                
                  { skillFilter.length === 0  &&
                   <Typography color='error'> No Data Found </Typography> }

                </Typography>
              </CardContent>
              <CardActions>
                  <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={this.handleClickOpen}
                      aria-label="move selected left"
                    >  Submit </Button>
                  </CardActions>
            </Card>
          </Fragment>}
            <Dialog
            open={this.state.openDialog}
            onClose={this.handleClose}
            className={classes.dialogRoot}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Please confirm choosen topics"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  <Fragment>
                  <AppBar position="static" elevation={1} color="transparent">
                    <Tabs
                      value={tabValue}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      {skillList.map(skill =>
                        <Tab key={skill.skillId} label={skill.skillname} value={skill.skillId} />
                      )}
                    </Tabs>
                  </AppBar>
                  <Card square className={classes.root} variant="outlined">
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                      { skillFilter && skillFilter.length > 0  &&
                    <List >
                        {skillFilter.map(value => {
                          if(value.checked === true){
                          return (
                            <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggle(value.id)}>
                            <ListItemText primary={value.name} />
                          </ListItem>
                        );}
                      })}
                        </List> }
                      
                        { skillFilter.length === 0  && <Typography color='error'> No Data Found </Typography> }

                      </Typography>
                    </CardContent>
                  </Card>
                </Fragment>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={this.handleSubmit} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
      </Paper>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Curriculum);
