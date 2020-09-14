import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/BatchMaster.actiontype";

export const TrainingCreationAction = {
    setAddBatchMasterList: (data) => {
        return async (dispatch) => {
            return clients.AddBatchMasterList.post('', data).then(res => {
                dispatch({
                    type: actionTypes.ADD_BATCH,
                    payload: res.data
                });
            }
            ).catch(
                error => {
                    return (error.response.data);
                }
            );
        }
    },
    getSkillList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/ListSkillsList.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getLocation: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/ListLocation.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },

    getAccount: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/ListAccount.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    registerTraining: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/AddTrainingList.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getTrainingList: async () => {
        try {
            const response = await clients.axiosAPI.get('TrainingListAll.php');
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getBatchList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('BatchMasterList.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getTrainingType: async () => {
        try {
            const response = await clients.axiosAPI.post('ListTrainingType.php');
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },

    addBatchName: async (data) => {
        try {
            const response = await clients.axiosAPI.post('BatchMasterAdd.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    insertCandidate: async (data) => {
        try {
            const response = await clients.axiosAPI.post('CandidateRegistration.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getLobList: async () => {
        try {
            const response = await clients.axiosAPI.get('ListLOB.php');
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getCandidateMapList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('BatchMapCandidateList.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    insertCandidateBatchMap: async (data) => {
        try {
            const response = await clients.axiosAPI.post('CandidateBatchMapAdd.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getSmeList: async () => {
        try {
            const response = await clients.axiosAPI.get('/ListSmelist.php');
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getTopicList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/TrainingBasedCurriculum.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    submitCurriculum: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/AddTrainingSkillCurriculumMapping.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    getEditTrainingData: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/TrainingDetails.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
    },
    EditTrainingList: async (data) => {
        try {
            const response = await clients.axiosAPI.post('/EditTrainingList.php', data);
            return (response.data);
        }
        catch (error) {
            return (error.response);
        }
      },
}
