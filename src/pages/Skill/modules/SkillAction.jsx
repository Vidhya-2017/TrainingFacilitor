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
  addCurriculum: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/AddCurriculum.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  getCurriculumList: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/ListCurriculum.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  editCurriculum: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/EditCurriculum.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  delCurriculum: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/DeleteCurriculum.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  },
  multidelCurriculum: async (data) => {
    try {
      const response = await clients.axiosAPI.post('/MultiDeleteCurriculum.php', data);
      return (response.data);
    }
    catch (error) {
      return (error.response);
    }
  }
}
