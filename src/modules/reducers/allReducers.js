import { combineReducers } from 'redux'
import { projectListReducer } from './ProjectList';
import { projectDetailReducer } from './ProjectDetail';

export default combineReducers({
    projectInfoList: projectListReducer,
    projectDetail: projectDetailReducer,
});