import clients from '../../../common/clients';

export const SMEAction = {
  getSMEList: async () => {
    try {
      const response = await clients.axiosAPI.post('/ListSmelist.php');
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  }, getSkillList: async (data) => {
    try {
        const response = await clients.axiosAPI.post('ListSkillsList.php', data);
        return (response.data);
    }
    catch (error) {
        return (error.response);
    }
},
  deleteSMEList: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/DeleteSmeList.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  editSMEList: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/EditSmeList.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
addSMEList: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/AddSmeList.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  }

    
    
}
