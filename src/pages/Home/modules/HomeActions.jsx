import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/Home.actiontype";

export const HomeActions = {
    importExcel: (data) => {
        return async (dispatch) => {
          return clients.axiosAPI.post('importCandidates.php', data).then(res =>{
            dispatch({
                type : actionTypes.IMPORT_EXCEL,
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