import clients from '../../../common/clients';

export const BatchFormationAction = {
  getTrainingList: async () => {
      try {
          const response = await clients.axiosAPI.get('/TrainingList.php');
          return (response.data);
      }
      catch (error) {
          return (error.response);
      }
  },
 addBatchName: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/BatchMasterAdd.php',data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
},
getBatchList: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/BatchMasterList.php',data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
},
getCandidateMapList: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/BatchMapCandidateList.php',data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
},
insertCandidateBatchMap: async (data) => {
    try {
        const response = await clients.axiosAPI.post('/CandidateBatchMapAdd.php',data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
}, 
}

