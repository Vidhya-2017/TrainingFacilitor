import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/AssesmentType.actiontype";

export const AssesmentTypeAction = {
    setAddAssesmentTypeList: (data) => {
        return async (dispatch) => {
          return clients.AddAssesmentTypeList.post('', data).then(res =>{
            dispatch({
                type : actionTypes.ADD_ASSESSMENT_TYPE,
                payload : res.data
            });
        }
            ).catch(
              error => {
              return (error.response.data);   
            }
            );
          }
      },
    
    
}
