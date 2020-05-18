import * as actionTypes from "../../../common/actionTypes/AssesmentType.actiontype";

export const initialState = {
      AssesmentTypeList : [],
};


export const AssesmentTypeReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_ASSESSMENT_TYPE:
        return {
            ...state,
            AssesmentTypeList : action.payload.AssesmentTypeList,
        };
        default:
        return state;
    }
}