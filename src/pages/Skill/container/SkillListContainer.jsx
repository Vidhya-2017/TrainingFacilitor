import { connect } from 'react-redux';
import { SkillAction } from '../modules/SkillAction';
import SkillList from '../component/SkillList';


const mapDispatchToProps = (dispatch) => {
  return {
    setAddSkillList: (data) => dispatch(SkillAction.setAddSkillList(data))
  };
};


const mapStateToProps = (state) => {
  return {
    SkillDetails: state.SkillReducer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillList);
 
 