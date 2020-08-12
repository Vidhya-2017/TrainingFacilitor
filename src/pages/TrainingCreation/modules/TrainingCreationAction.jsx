import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/BatchMaster.actiontype";

export const BatchMasterAction = {
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
