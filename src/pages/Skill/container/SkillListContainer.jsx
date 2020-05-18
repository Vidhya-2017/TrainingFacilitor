import { connect } from 'react-redux';
import SkillList from '../component/SkillList';
import { SkillAction } from '../modules/SkillAction';

const mapDispatchToProps = (dispatch) => {
  return {
    setAddSkillList: (data) => dispatch(SkillAction.setAddSkillList(data))
  };
};


const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillList);
 