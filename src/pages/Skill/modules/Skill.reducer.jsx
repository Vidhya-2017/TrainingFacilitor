import * as actionTypes from "../../../common/actionTypes/Skill.actiontype";

export const initialState = {
      SkillDetails : [],
};


export const SkillReducer = (state = initialState, action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.ADD_SKILL:
        return {
            ...state,
            SkillDetails : action.payload,
        };
        default:
        return state;
    }
}