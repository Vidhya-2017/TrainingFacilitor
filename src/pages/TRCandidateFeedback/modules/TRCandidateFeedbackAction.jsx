import clients from '../../../common/clients';


export const TRCandidateFeedbackAction = {

      insertCandidateFeedback: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/CandidateFeedbackAdd.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
      }, 
   

}
