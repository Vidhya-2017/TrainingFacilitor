import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/CandidateRegistration.actiontype";

export const CandidateRegistrationAction = {
    setAddBatchMasterList: (data) => {
        return async (dispatch) => {
          return clients.AddBatchMasterList.post('', data).then(res =>{
            dispatch({
                type : actionTypes.ADD_BATCH,
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
