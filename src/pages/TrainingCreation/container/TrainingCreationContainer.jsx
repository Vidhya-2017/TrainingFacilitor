import { connect } from 'react-redux';
import { TrainingCreationAction } from '../modules/TrainingCreationAction';
import TrainingCreation from '../component/TrainingCreation';

const mapDispatchToProps = (dispatch) => {
  return {
    getSkillList: TrainingCreationAction.getSkillList,
    getLocation: TrainingCreationAction.getLocation,
    getAccount: TrainingCreationAction.getAccount
    
  };
};

const mapStateToProps = state => (
  {
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(TrainingCreation);
 