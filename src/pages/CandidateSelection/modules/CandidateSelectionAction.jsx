import clients from '../../../common/clients';

export const CandidateSelectionAction = {
  getTrainingList: async () => {
    try {
      const response = await clients.axiosAPI.get('/TrainingList.php');
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  getCandidatesByTrainingList: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/candidateTrainingList.php',data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  insertCandidates: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/candidateSelectionInsert.php',data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
}
