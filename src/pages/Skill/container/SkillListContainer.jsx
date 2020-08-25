import { connect } from 'react-redux';
import { SkillAction } from '../modules/SkillAction';
import SkillList from '../component/SkillList';


const mapDispatchToProps = (dispatch) => {
  return {
    getSkillList: SkillAction.getSkillList,
    deleteSkillList: SkillAction.deleteSkillList,
    addSkillList: SkillAction.addSkillList,
    editSkillList: SkillAction.editSkillList
  };
};


const mapStateToProps = (state) => {
  return {
    SkillDetails: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillList);

