import * as actionTypes from "../../../common/actionTypes/Home.actiontype";

export const initialState = {
      HomeDetails : [],
};


export const HomeReducer = (state = initialState, action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.IMPORT_EXCEL:
        return {
            ...state,
            HomeDetails : action.payload,
        };
        default:
        return state;
    }
}