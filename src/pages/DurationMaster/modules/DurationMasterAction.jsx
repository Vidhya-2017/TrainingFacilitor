import clients from '../../../common/clients';


export const DurationMasterAction = {


    getDurationMasterList: async () => {
        try {
            const response = await clients.axiosAPI.post('/ListDurationMaster.php');
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }

    },

      deleteDurationMasterList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/DeleteDurationMaster.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
      },
      addDurationMasterList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/AddDurationMaster.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
      },

      editDurationMasterList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/EditDurationMaster.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
      },


}
