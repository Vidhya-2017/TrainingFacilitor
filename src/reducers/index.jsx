import { combineReducers } from "redux";
import { SMEReducer } from '../pages/SME/modules/SME.reducer';
export default combineReducers({
    SMEReducer : SMEReducer,
});
