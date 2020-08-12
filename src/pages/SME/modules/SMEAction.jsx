import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/SME.actiontype";

export const SMEAction = {
    setAddSMEList: (data) => {
        return async (dispatch) => {
          return clients.AddSMEList.post('AddSmeList.php', data).then(res =>{
            dispatch({
                type : actionTypes.ADD_SME,
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
