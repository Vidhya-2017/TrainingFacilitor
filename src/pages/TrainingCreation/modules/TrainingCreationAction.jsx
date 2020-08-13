import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/BatchMaster.actiontype";

export const TrainingCreationAction = {
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
      getSkillList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('ListSkillsList.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getLocation: async (data) => {
      try {
          const response = await clients.axiosAPI.post('ListLocation.php', data);
          return (response.data);
      }
      catch (error) {
          return (error.response);
      }
  },

  getAccount: async (data) => {
    try {
        const response = await clients.axiosAPI.post('ListAccount.php', data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
},
}
