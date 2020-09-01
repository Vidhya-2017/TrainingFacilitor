import React, { Fragment } from 'react';
import { AppBar, Tabs, Tab, Paper, withStyles, Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import SelectOne from '../../../components/UI_Component/Select/SelectOne';

const styles = theme => ({
  paperRoot: {
    width: '100%',
    padding: '10px 15px'
  }
})
class Curriculum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      trainingList: [],
      selectedTraining: null,
      skillList: []
    }
  }

  componentDidMount() {
    this.getTrainingList();
  }

  getTrainingList = () => {
    this.props.getTrainingList().then(response => {
      if (response && response.errCode === 200) {
        console.log('--trainingList-', response.arrRes);

        const trainingList = response.arrRes.map(list => {
          return {
            value: list.id,
            id: list.id,
            label: list.training_name,
            skillsID: list.skills,
            skill_name: list.skill_name.split(','),
            sme_name: list.sme_name,
            smeID: list.sme
          }
        });
        this.setState({ trainingList });
      } else {
        this.setState({ snackbaropen: true, snackmsg: 'Something went Wrong. Please try again later', snackvariant: "error" })
      }
    })
  }

  selectTrainingChange = (selectedTraining) => {
    const { trainingList } = this.state;
    const skillDetails = selectedTraining.target.skillsID.map((list, index) => {
      return {
        skillname: selectedTraining.target.skill_name[index],
        skillId: list
      }
    });
    this.setState({ selectedTraining: selectedTraining.target, skillList: skillDetails });
    // this.getBatchList(selectedTraining.target.value);
  }


  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    const { classes } = this.props;
    const { tabValue, skillList, selectedTraining, trainingList } = this.state;
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
                  <Tab key={skill.skillId} label={skill.skillname} />
                )}
              </Tabs>
            </AppBar>
            <Card square className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Curriculum List
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Learn More</Button> */}
              </CardActions>
            </Card>
          </Fragment>}
      </Paper>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Curriculum);
