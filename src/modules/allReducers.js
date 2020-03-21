import { combineReducers } from 'redux'
import { projectListReducer } from './ProjectList';
import { projectDetailReducer } from './ProjectDetail';
import { reducer as reduxFormReducer } from 'redux-form';
import { signupTempReducer } from './SignupTemp';

export default combineReducers({
    infoList: projectListReducer,
    projectDetail: projectDetailReducer,
    form: reduxFormReducer,
    users: signupTempReducer
});