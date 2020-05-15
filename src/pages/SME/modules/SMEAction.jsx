import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/SME.actiontype";

export const SMEAction = {
    setAddSMEList: async (data) => {
        try {
            const response = await clients.AddSMEList.post('', data);           
            return (dispatch) => dispatch({
                type : actionTypes.ADD_SME,
                payload : response.data
            });
        }
        catch (error) {
            return (error.response);
        }
    },
    
    
}
