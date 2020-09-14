import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/Home.actiontype";

export const HomeActions = {
  importExcel: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/importCandidates.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  /*  importExcel: (data) => {
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
     }, */
  getTrainingList: async () => {
    try {
      const response = await clients.axiosAPI.get('/TrainingList.php');
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  insertCandidates: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/CandidateUpload.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  getAllTrainingList: async () => {
    try {
      const response = await clients.axiosAPI.get('/TrainingListAll.php');
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  getSkillList: async () => {
    try {
      const response = await clients.axiosAPI.get('/ListSkillsList.php');
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  insertCurriculum: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/CurriculumUpload.php',data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  }
}