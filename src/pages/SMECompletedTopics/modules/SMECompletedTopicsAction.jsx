import clients from '../../../common/clients';


export const SMECompletedTopicsAction = {
 
    getTrainingList: async () => {
      try {
          const response = await clients.axiosAPI.post('/TrainingList.php');
          return (response.data);
      }
      catch (error) {
          return (error.response);
      }
  }, 
  trainingListDetails: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/TrainingListDetails.php', data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
  },
  getCurriculumBySkill: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/CurriculumSearch.php', data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
  },
  insertCurriculamData: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/AddSmeCoveredTopic.php', data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
  },
    
}
