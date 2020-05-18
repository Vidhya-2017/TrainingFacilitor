import * as actionTypes from "../../../common/actionTypes/Skill.actiontype";

export const initialState = {
      SkillList : [],
};


export const SkillReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_SKILL:
        return {
            ...state,
            SkillList : action.payload.SkillList,
        };
        default:
        return state;
    }
}