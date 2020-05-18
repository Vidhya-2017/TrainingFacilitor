import clients from '../../../common/clients';
import * as actionTypes from "../../../common/actionTypes/Skill.actiontype";

export const SkillAction = {
    setAddSkillList: (data) => {
        return async (dispatch) => {
          return clients.AddSkillList.post('', data).then(res =>{
            dispatch({
                type : actionTypes.ADD_SKILL,
                payload : res.data
            });
        }
            ).catch(
              error => {
              return (error.response.data);   
            }
            );
          }
      },
    
    
}
