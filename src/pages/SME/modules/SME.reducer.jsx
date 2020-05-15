import * as actionTypes from "../../../common/actionTypes/SME.actiontype";

export const initialState = {
      SMEList : [],
};


export const SMEReducer = (state = initialState, action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.ADD_SME:
        return {
            ...state,
            SMEList : action.payload.SMEList,
        };
        default:
        return state;
    }
}