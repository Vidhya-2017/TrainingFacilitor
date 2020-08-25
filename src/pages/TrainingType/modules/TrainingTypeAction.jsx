import clients from '../../../common/clients';


export const TrainingTypeAction = {
 
    getTrainingTypeList: async () => {
      try {
          const response = await clients.axiosAPI.post('/ListTrainingType.php');
          return (response.data);
      }
      catch (error) {
          return (error.response);
      }
  }, 
  addTrainingType: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/AddTrainingType.php', data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
  },
  editTrainingType: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/EditTrainingType.php', data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
  },
    deleteTrainingType: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/DeleteTrainingType.php', data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
  },
    
}
