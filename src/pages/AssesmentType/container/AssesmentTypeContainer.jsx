import { connect } from 'react-redux';
import AssesmentType from '../component/AssesmentType';
import { AssesmentTypeAction } from '../modules/AssesmentTypeAction';

const mapDispatchToProps = (dispatch) => {
  return {
    setAddAssesmentTypeList: (data) => dispatch( AssesmentTypeAction.setAddAssesmentTypeList(data))
  };
};

const mapStateToProps = (state) => {
  return{}
}

export default connect(mapStateToProps, mapDispatchToProps)(AssesmentType);
 