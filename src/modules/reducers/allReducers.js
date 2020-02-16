import { combineReducers } from 'redux'
import { projectListReducer } from './ProjectList';
import { checkProjectMemberReducer } from './ProjectDetail';
import { userInfoListReducer } from './UserInfoReducer';

export default combineReducers({
    projectInfoList: projectListReducer,
    isExistMemberStatus: checkProjectMemberReducer,
    userInfoList: userInfoListReducer
});