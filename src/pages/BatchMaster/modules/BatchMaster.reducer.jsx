import * as actionTypes from "../../../common/actionTypes/BatchMaster.actiontype";

export const initialState = {
      BatchMasterList : [],
};


export const BatchMasterReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_BATCH:
        return {
            ...state,
            BatchMasterList : action.payload,
        };
        default:
        return state;
    }
}