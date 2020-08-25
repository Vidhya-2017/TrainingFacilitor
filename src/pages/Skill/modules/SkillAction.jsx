import clients from '../../../common/clients';

export const SkillAction = {
  getSkillList: async (data) => {
    try {
      const response = await clients.axiosAPI.post('ListSkillsList.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  deleteSkillList: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/DeleteSkillsList.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  addSkillList: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/AddSkillsList.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },

  editSkillList: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/EditSkillsList.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },



}
