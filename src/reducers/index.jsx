import { combineReducers } from "redux";
import { SMEReducer } from '../pages/SME/modules/SME.reducer';
import { SkillReducer } from '../pages/Skill/modules/Skill.reducer';
import { AssesmentTypeReducer } from '../pages/AssesmentType/modules/AssesmentType.reducer';
export default combineReducers({
    SMEReducer : SMEReducer,
    SkillReducer: SkillReducer,
    AssesmentTypeReducer: AssesmentTypeReducer
});
