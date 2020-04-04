import { combineReducers } from 'redux'
import { projectListReducer } from './ProjectList';
import { projectDetailReducer } from './ProjectDetail';
import { reducer as reduxFormReducer } from 'redux-form';
import { signupTempReducer } from './SignupTemp';
import { signupReducer } from './Signup';
import { signinReducer } from './Signin';
import { parentTaskDetailReducer } from './ParentTaskDetail';
import { childTaskDetailReducer } from './ChildTaskDetail';
import { registerReducer } from './Register';

export default combineReducers({
    projectInfo: projectListReducer,
    project: projectDetailReducer,
    form: reduxFormReducer,
    signupTemp: signupTempReducer,
    signup: signupReducer, 
    userInfo: signinReducer,
    parentTask: parentTaskDetailReducer,
    childTask: childTaskDetailReducer,
    register: registerReducer
});