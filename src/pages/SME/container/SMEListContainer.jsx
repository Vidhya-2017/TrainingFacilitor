import { connect } from 'react-redux';
import { SMEAction } from '../modules/SMEAction';
import SMEList from '../component/SMEList';


const mapDispatchToProps = (dispatch) => {
  return {
    setAddSMEList: (data) => dispatch(SMEAction.setAddSMEList(data))
  };
};


const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SMEList);
 
 