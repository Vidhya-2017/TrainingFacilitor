import { connect } from 'react-redux';
import { TrainingCreationAction } from '../modules/TrainingCreationAction';
import TrainingCreation from '../component/TrainingCreation';

const mapDispatchToProps = (dispatch) => {
  return {
    getSkillList: TrainingCreationAction.getSkillList,
    getLocation: TrainingCreationAction.getLocation,
    getAccount: TrainingCreationAction.getAccount,
    registerTraining: TrainingCreationAction.registerTraining,
    getTrainingList: TrainingCreationAction.getTrainingList,
    getBatchList: TrainingCreationAction.getBatchList,
    addBatchName: TrainingCreationAction.addBatchName,
    getTrainingType: TrainingCreationAction.getTrainingType,
  };
};

const mapStateToProps = state => (
  {
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(TrainingCreation);
 